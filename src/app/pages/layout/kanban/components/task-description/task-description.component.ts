import {Component, inject, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ListTasksComponent} from '../list-tasks/list-tasks.component';
import {NgStyle} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {CreateTagsComponent} from '../create-tags/create-tags.component';
import {MaterialModule} from '../../../../../shared/modules/material.module';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrl: './task-description.component.scss',
  standalone: true,
  imports: [FormsModule, MatButtonModule, NgStyle, MatInput, ReactiveFormsModule, MaterialModule]
})
export class TaskDescriptionComponent {
  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ListTasksComponent>);

  constructor(public dialog: MatDialog) {
    console.log(this.data);
  }

  subTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    isCompleted: new FormControl(false),
    cardId: new FormControl('', [Validators.required]),
  })

  completedItems = 0;
  totalItems = 0;

  checkListItem = {
    title: this.subTaskForm.value.title!,
    isCompleted: this.subTaskForm.value.isCompleted!,
    cardId: this.subTaskForm.value.cardId!,
  }

  checkListItems = [
    {
      title: 'Task 1',
      isCompleted: false,
      cardId: '1',
    },
    {
      title: 'Task 2',
      isCompleted: false,
      cardId: '1',
    },
    {
      title: 'Task 3',
      isCompleted: false,
      cardId: '1',
    },
  ];

  mode: ProgressBarMode = 'determinate';
  value = this.completedItems;
  bufferValue = this.totalItems;

  close(): void {
    this.dialogRef.close();
  }

  openFileDialog() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true; // Cho phép chọn nhiều file
    fileInput.accept = '*'; // Chỉnh '*/*' nếu muốn nhận mọi loại file
    fileInput.click();

    fileInput.onchange = (event: any) => {
      const files = event.target.files;
      console.log('Selected files:', files);
      // Xử lý file nếu cần, ví dụ: lưu vào mảng data.files
    };
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTagsComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with result:', result);
        // Handle the result here
      }
    });
  }


}
