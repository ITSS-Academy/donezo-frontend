import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {EditBackgroundComponent} from '../edit-background/edit-background.component';
import {FilterKanbanComponent} from '../filter-kanban/filter-kanban.component';
import {MembersComponent} from '../add-members/members.component';
import {debounceTime, forkJoin, Observable, Subject, Subscription} from 'rxjs';
import {UserModel} from '../../../../../models/user.model';
import {NotificationsState} from '../../../../../ngrx/notifications/notifications.state';
import {Store} from '@ngrx/store';
import {UserState} from '../../../../../ngrx/user/user.state';
import {BoardState} from '../../../../../ngrx/board/board.state';
import {NotificationsService} from '../../../../../services/notifications-api/notifications.service';
import {UserService} from '../../../../../services/user/user.service';
import * as userActions from '../../../../../ngrx/user/user.actions';
import {MaterialModule} from '../../../../../shared/modules/material.module';
import * as labelActions from '../../../../../ngrx/label/label.actions';
import {LabelState} from '../../../../../ngrx/label/label.state';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-kanban-navbar',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf,
    NgIf,
    MaterialModule,
    FormsModule
  ],
  templateUrl: './kanban-navbar.component.html',
  styleUrl: './kanban-navbar.component.scss'
})
export class KanbanNavbarComponent implements OnInit, OnDestroy {
  avatars = [
    {
      member: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s']
    }
  ]

  userNameSubject = new Subject<string>();

  subcriptions: Subscription[] = [];

  ownerId!: string;
  owner!: UserModel;
  memberIds!: string[];
  members!: UserModel[];

  inputValue: string = 'Board Name';
  placeholder: string = 'Board Name';
  isEditing: boolean = false;
  inputWidth: number = 12;
  isFiltering!: boolean;

  @ViewChild('textInput', { static: false })
  textInput!: ElementRef<HTMLInputElement>;
  @ViewChild('textMeasurer', { static: true })
  textMeasurer!: ElementRef<HTMLSpanElement>;

  constructor(public dialog: MatDialog,
              private store: Store<{
                user: UserState;
                notifications: NotificationsState;
                board: BoardState;
                label: LabelState
              }>,
              private notiSocket: NotificationsService,
              private userService: UserService,
              private cdr: ChangeDetectorRef,) {
  }

  boardId!: string;
  boardName!: string;

  ngOnInit(): void {
    this.subcriptions.push(
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.ownerId = board.ownerId!;
          this.boardName = board.name!;
          console.log('ownerId', this.ownerId);
          this.memberIds = board.members!;
          console.log('memberIds', this.memberIds);
          this.boardId = board.id!;
          forkJoin(
            this.memberIds.map((member) => this.userService.getUserById(member)),
          ).subscribe((users) => {
            this.members = users;
            console.log('members', this.members);
          });
        }
      }),
      this.store.select('label', 'isGetLabelForFilterSuccess').subscribe((success) => {
        if (success) {
          const dialogRef = this.dialog.open(FilterKanbanComponent, {
            data: {}
          });
        }
      }),
      this.userNameSubject.pipe(debounceTime(500)).subscribe((value) => {
        if (value !== '') {
          this.store.dispatch(userActions.searchUsers({email: value}));
        }
      }),
      // this.store
      //   .select('notifications', 'isInvitingUserSuccess')
      //   .subscribe((success) => {
      //     if (success) {
      //       this.openSnackBar('Invited users successfully');
      //     }
      //   }),
      // this.store
      //   .select('notifications', 'isInvitingUserFailure')
      //   .subscribe((failure) => {
      //     if (failure) {
      //       this.openSnackBar(failure);
      //     }
      //   }),
      // this.store.select('board', 'isGetBoardsSuccess').subscribe((success) => {
      //   if (success) {
      //     this.userService.getUserById(this.ownerId).subscribe((user) => {
      //         if (user) {
      //           this.owner = user;
      //           console.log('owner', this.owner);
      //         }
      //       }
      //     )
      //
      //   }
      // }),
    );

  }

  ngOnDestroy(): void {
    this.subcriptions.forEach(sub => sub.unsubscribe());
  }

  adjustWidth(): void {
    if (this.textMeasurer) {
      this.textMeasurer.nativeElement.textContent = this.inputValue
        ? this.inputValue
        : '';
      this.inputWidth = this.textMeasurer.nativeElement.offsetWidth;
    }
  }

  enableEditing(): void {
    this.isEditing = true;

    this.cdr.detectChanges();
    setTimeout(() => {
      this.adjustWidth();
      this.textInput.nativeElement.focus();
      this.textInput.nativeElement.select();
    }, 0);
  }

  disableEditing(): void {
    // this.store.dispatch(
    //   boardActions.changeBoardName({ boardId: this.id, name: this.inputValue }),
    // );
    this.isEditing = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditBackgroundComponent, {
      data: {} // Pass any data you need to the dialog here
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with result:', result);
        // Handle the result here
      }
    });
  }

  openMembersDialog(): void {
    const dialogRef = this.dialog.open(MembersComponent, {
      data: {},
      width: 'fit-content'
    });
  }

  openDialogFilter(): void {
    this.store.dispatch(labelActions.getLabelForFilter({id: this.boardId}));

  }
}
