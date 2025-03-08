import {Component, Inject} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions
} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {Store} from '@ngrx/store';
import {ListState} from '../../../../../../../ngrx/list/list.state';
import {BoardState} from '../../../../../../../ngrx/board/board.state';
import * as listActions from '../../../../../../../ngrx/list/list.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, ReactiveFormsModule]
})
export class TaskComponent {
  taskTitle = '';

  constructor(
    public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<{
      board: BoardState;
      list: ListState;
    }>
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close();
  }

  cardName = new FormControl('', [Validators.required]);


  createNewTask() {
    console.log(this.cardName.value);
    console.log(this.cardName.valid);
    if (!this.cardName.valid) {
      return;
    }
    this.store.dispatch(
      listActions.addCard({card: this.cardName.value!, listId: this.data}),
    );
    this.cardName.reset();
  }
}
