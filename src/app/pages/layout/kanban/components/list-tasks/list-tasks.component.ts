import {Component, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TaskComponent} from './components/task/task.component';
import {TaskDescriptionComponent} from '../task-description/task-description.component';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, MatButtonModule, MatIconModule, MatInput, MatFormField, FormsModule]
})
export class ListTasksComponent {
  columns = [
    {
      id: 'ideas',
      title: 'Ideas',
      tasks: [
        {
          title: 'Task 1',
          time: '12 Nov 2022',
          tags: ['#FF9800'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 2, attachments: 1,
          checklist: {completed: 1, total: 3}
        },
        {
          title: 'Task 2',
          time: '13 Nov 2022',
          tags: ['#F44336', '#00BCD4'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 5, attachments: 3,
          checklist: {completed: 2, total: 4}
        },
        {
          title: 'Task 7',
          time: '13 Nov 2022', tags: ['#4CAF50'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 1, attachments: 0,
          checklist: {completed: 0, total: 2}
        }
      ]
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      tasks: [
        {
          title: 'Task 3',
          time: '14 Nov 2022', tags: ['#2196F3'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 7, attachments: 2,
          checklist: {completed: 2, total: 5}
        },
        {
          title: 'Task 4',
          time: '15 Nov 2022', tags: ['#9C27B0'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 3, attachments: 1,
          checklist: {completed: 3, total: 3}
        },
        {
          title: 'Task 9',
          time: '13 Nov 2022', tags: ['#FF9800', '#F44336'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 4, attachments: 2,
          checklist: {completed: 1, total: 4}
        },
        {
          title: 'Task 10',
          time: '13 Nov 2022', tags: ['#00BCD4'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 6, attachments: 3,
          checklist: {completed: 2, total: 3}
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          title: 'Task 5',
          time: '16 Nov 2022', tags: ['#4CAF50'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 8, attachments: 4,
          checklist: {completed: 4, total: 4}
        },
        {
          title: 'Task 6',
          time: '17 Nov 2022', tags: ['#9C27B0', '#2196F3'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 5, attachments: 2,
          checklist: {completed: 3, total: 3}
        },
        {
          title: 'Task 11',
          time: '13 Nov 2022', tags: ['#FF9800'],
          members: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s'],
          comments: 2, attachments: 1,
          checklist: {completed: 2, total: 5}
        }
      ]
    }
  ];

  showColumnInput = false;

  constructor(public dialog: MatDialog) {
  }

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
      data: {column}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && typeof result === 'string' && result.trim()) {
        column.tasks.push({
          title: result.trim(),
          time: new Date().toLocaleDateString(),
          tags: [],
          members: [],
          comments: 0,
          attachments: 0,
          checklist: {completed: 0, total: 0}
        });
      }
    });
  }


  descriptionDialog = inject(MatDialog);

  openDescriptionDialog(data: any): void {
    this.descriptionDialog.open(TaskDescriptionComponent, {
      data: data
    });
  }


  deleteTask(column: any, task: any): void {
    column.tasks = column.tasks.filter((t: any) => t !== task);
  }

  addColumn(title: string): void {
    if (title.trim()) {
      this.columns.push({
        id: title.toLowerCase().replace(/\s+/g, '-'),
        title,
        tasks: []
      });
    }
    this.showColumnInput = false;
  }

  protected readonly TaskDescriptionComponent = TaskDescriptionComponent;
  value = '';
}
