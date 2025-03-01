import {Component, EventEmitter, inject, Output, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {MaterialModule} from "../../shared/modules/material.module";
import {DrawerService} from "../../services/drawer.service";
import {RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CreateBoardComponent} from '../create-board/create-board.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() onToggleDrawer = new EventEmitter<string>();

  constructor(private drawerService: DrawerService) {}

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

  boards = [
    {
      name: 'Work',
      background: 'https://t3.ftcdn.net/jpg/05/13/59/72/360_F_513597277_YYqrogAmgRR9ohwTUnOM784zS9eYUcSk.jpg',
    },
    {
      name: 'Personal',
      background: 'https://media.istockphoto.com/id/1285308242/photo/to-do-list-text-on-notepad.jpg?s=612x612&w=0&k=20&c=p85bCVQZwvkrqqqNOJGg2QuPDu6ynTlQHkASQOTELh8=',
    },
  ];

  invitedBoards = [
    {
      name: 'Trip to Japan',
      background: 'https://t3.ftcdn.net/jpg/05/13/59/72/360_F_513597277_YYqrogAmgRR9ohwTUnOM784zS9eYUcSk.jpg',
    },
  ];

  toggleDrawer(drawerName:string) {
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
