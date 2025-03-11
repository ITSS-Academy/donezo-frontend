import {Component, inject, OnDestroy, OnInit} from '@angular/core';

import {MaterialModule} from '../../../../../shared/modules/material.module';
import {UserModel} from '../../../../../models/user.model';
import {debounceTime, forkJoin, Observable, Subject, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {UserState} from '../../../../../ngrx/user/user.state';
import {NotificationsState} from '../../../../../ngrx/notifications/notifications.state';
import {BoardState} from '../../../../../ngrx/board/board.state';
import {NotificationsService} from '../../../../../services/notifications-api/notifications.service';
import {UserService} from '../../../../../services/user/user.service';
import * as userActions from '../../../../../ngrx/user/user.actions';
import * as notificationsActions from '../../../../../ngrx/notifications/notifications.actions';
import {FormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-add-members',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements OnInit, OnDestroy {
  userNameSubject = new Subject<string>();

  dialogRef!: MatDialogRef<MembersComponent>;

  searchUser$!: Observable<UserModel[]>;
  searchUser!: UserModel;

  subcriptions: Subscription[] = [];

  readonly data = inject<string>(MAT_DIALOG_DATA);
  owener!: string;
  owner!: Observable<UserModel>;
  memberIds!: string[];
  members!: UserModel[];

  constructor(
    private store: Store<{
      user: UserState;
      notifications: NotificationsState;
      board: BoardState;
    }>,
    private notiSocket: NotificationsService,
    private userService: UserService,
  ) {
    console.log(this.data);
  }

  ngOnInit() {
    this.searchUser$ = this.store.select('user', 'searchUsers');

    this.subcriptions.push(
      this.store.select('user', 'searchUsers').subscribe((users) => {
        if (users.length > 0) {
          this.searchUser = users[0];
        }
      }),
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.owener = board.ownerId!;
          this.memberIds = board.members!;
        }
      }),
      this.userNameSubject.pipe(debounceTime(500)).subscribe((value) => {
        if (value !== '') {
          this.store.dispatch(userActions.searchUsers({ email: value }));
        }
      }),
      this.store
        .select('notifications', 'isInvitingUserSuccess')
        .subscribe((success) => {
          if (success) {
            alert('Invited users successfully');
          }
        }),
      this.store
        .select('notifications', 'isInvitingUserFailure')
        .subscribe((failure) => {
          if (failure) {
            alert(failure);
          }
        }),
    );
    this.owner = this.userService.getUserById(this.owener);
    forkJoin(
      this.memberIds.map((member) => this.userService.getUserById(member)),
    ).subscribe((users) => {
      this.members = users;
    });
  }

  userName!: string;

  onUserNameChange() {
    this.userNameSubject.next(this.userName);
  }


  // durationInSeconds = 5;
  //
  // openSnackBar(content: string) {
  //   this._snackBar.openFromComponent(ShareSnackbarComponent, {
  //     data: content,
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }

  ngOnDestroy() {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
    this.subcriptions = [];
    // this.store.dispatch();
  }

  inviteUsers() {
    this.store.dispatch(
      notificationsActions.inviteUser({
        invitedUser: this.searchUser!,
        boardId: this.data,
      }),
    );
  }

  cancel() {
this.dialogRef.close();
  }
}


