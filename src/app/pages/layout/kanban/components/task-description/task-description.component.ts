import {Component, inject, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ListTasksComponent} from '../list-tasks/list-tasks.component';
import {NgStyle} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss'],
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatDialogContent, MatDialogTitle, MatDialogActions, NgStyle, MatIcon, MatDividerModule, MatIconModule, MatCheckbox, MatFormField, MatInput]
})
export class TaskDescriptionComponent {
  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ListTasksComponent>);

  constructor() {
    console.log(this.data);
  }

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

}
