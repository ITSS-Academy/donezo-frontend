import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskComponent } from './components/task/task.component';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, MatButtonModule, MatIconModule]
})
export class ListTasksComponent {
  columns = [
    { id: 'ideas',
      title: 'Ideas',
      tasks: [{ title: 'Task 1', time: '12 Nov 2022' },
        { title: 'Task 2', time: '13 Nov 2022' },
        { title: 'Task 7', time: '13 Nov 2022' }]
    },
    { id: 'inProgress',
      title: 'In Progress',
      tasks: [{ title: 'Task 3', time: '14 Nov 2022' },
        { title: 'Task 4', time: '15 Nov 2022' },
        { title: 'Task 9', time: '13 Nov 2022' },
        { title: 'Task 10', time: '13 Nov 2022' }]
    },
    { id: 'done',
      title: 'Done',
      tasks: [{ title: 'Task 5', time: '16 Nov 2022' },
        { title: 'Task 6', time: '17 Nov 2022' },
        { title: 'Task 11', time: '13 Nov 2022' }]
    }
  ];

  constructor(public dialog: MatDialog) {}

  get dropListIds() {
    return this.columns.map(column => column.id);
  }

  dropColumn(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  dropCard(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  openDialog(column: any): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '300px',
      data: { column }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        column.tasks.push({ title: result, time: new Date().toLocaleDateString() });
      }
    });
  }

  deleteTask(column: any, task: any): void {
    column.tasks = column.tasks.filter((t: any) => t !== task);
  }
}
