import {Component} from '@angular/core';
import {ListTasksComponent} from "./components/list-tasks/list-tasks.component";
import {MatButton} from '@angular/material/button';
import {MembersComponent} from './components/add-members/members.component';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {CreateTagsComponent} from './components/create-tags/create-tags.component';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [ListTasksComponent, MatButton, MatIcon],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {

  protected readonly open = open;

  constructor(public dialog: MatDialog) {

  }

  openTagsDialog(): void {
    const dialogRef = this.dialog.open(CreateTagsComponent, {
      data: {},
      width: 'fit-content'
    });
  }

  openMembersDialog(): void {
    const dialogRef = this.dialog.open(MembersComponent, {
      data: {},
      width: 'fit-content'
    });
  }



  protected readonly MembersComponent = MembersComponent;
  protected readonly CreateTagsComponent = CreateTagsComponent;
}
