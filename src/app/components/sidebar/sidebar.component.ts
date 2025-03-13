import {Component, EventEmitter, inject, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {MaterialModule} from "../../shared/modules/material.module";
import {DrawerService} from "../../services/drawer.service";
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CreateBoardComponent} from '../create-board/create-board.component';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import * as boardActions from '../../ngrx/board/board.actions';
import {Observable, Subscription} from 'rxjs';
import {BoardModel} from '../../models/board.model';
import {AsyncPipe} from '@angular/common';
import {UserModel} from '../../models/user.model';
import {UserState} from '../../ngrx/user/user.state';
import {LogoutComponent} from './logout/logout.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterLink, AsyncPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  boards$!: Observable<BoardModel[] | null>;

  @Output() onToggleDrawer = new EventEmitter<string>();

  constructor(private drawerService: DrawerService,
              private router: Router,
              private store: Store<{
                board: BoardState,
                user: UserState
              }>) {
    this.store.dispatch(boardActions.getBoards())
  }

  supcriptions: Subscription[] = [];
  user!: UserModel

  ngOnInit() {
    this.boards$ = this.store.select('board', 'boards');
    console.log('Boards:', this.boards$);
    this.supcriptions.push(
      this.store.select('user', 'user').subscribe(user => {
        if (user) {
          this.user = user;
        }
      })
    )
  }

  navLinks = [
    {
      name: 'Home',
      route: '/home',
      icon: 'home',
    },
    {
      name: 'All tasks',
      route: '/allTasks',
      icon: 'assignment',
    },
    {
      name: 'Search',
      route: '/search',
      icon: 'search',
    }
  ];

  boards: BoardModel[] = [];

  invitedBoards = [
    {
      name: 'Trip to Japan',
      background: 'https://t3.ftcdn.net/jpg/05/13/59/72/360_F_513597277_YYqrogAmgRR9ohwTUnOM784zS9eYUcSk.jpg',
    },
  ];

  toggleDrawer(drawerName: string) {
    this.onToggleDrawer.emit(drawerName)
  }

  readonly boardDialog = inject(MatDialog);

  openBoardDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.boardDialog.open(CreateBoardComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  readonly logoutDialog = inject(MatDialog);

  openLogoutDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.logoutDialog.open(LogoutComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.supcriptions.forEach((sub) => sub.unsubscribe());
    this.supcriptions = [];
  }

  getBackgroundUrl(board: BoardModel): string {
    if (!board.background) {
      return ''; // Default empty if background is not set
    }

    if (typeof board.background === 'object' && 'fileLocation' in board.background) {
      return board.background.fileLocation || '';
    }

    return board.background as string;
  }

}
