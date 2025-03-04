import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss'],
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatDialogContent, MatDialogTitle, MatDialogActions]
})
export class TaskDescriptionComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  close(): void {
    this.dialogRef.close(this.data.task.description);
  }
}
