import {Component, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {MaterialModule} from "../../shared/modules/material.module";
import {DrawerService} from "../../services/drawer.service";
import {RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CreateBoardComponent} from '../create-board/create-board.component';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import * as boardActions from '../../ngrx/board/board.actions';
import {Subscription} from 'rxjs';
import {BoardModel} from '../../models/board.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Output() onToggleDrawer = new EventEmitter<string>();

  constructor(private drawerService: DrawerService,
              private store: Store<{
                board: BoardState
              }>) {
    this.store.dispatch(boardActions.getBoards())
  }

  subcripions: Subscription[] = [];

  ngOnInit() {
    this.subcripions.push(
      this.store.select('board', 'boards').subscribe((boards) => {
        if (boards) {
          console.log(boards)
          this.boards = boards
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
      name: 'All boards',
      route: '/allBoards',
      icon: 'all_inbox',
    },
    {
      name: 'All tasks',
      route: '/allTasks',
      icon: 'assignment',
    },
    {
      name: 'Notifications',
      route: '/notifications',
      icon: 'notifications',
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

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateBoardComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
