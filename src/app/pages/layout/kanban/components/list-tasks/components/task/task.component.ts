import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions]
})
export class TaskComponent {
  taskTitle = '';

  constructor(
    public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.taskTitle);
  }
}
