import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Store} from '@ngrx/store';
import {BoardState} from '../../../../../ngrx/board/board.state';
import {MatDialogRef} from '@angular/material/dialog';
import * as boardActions from '../../../../../ngrx/board/board.actions';

@Component({
  selector: 'app-edit-background',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './edit-background.component.html',
  styleUrl: './edit-background.component.scss'
})
export class EditBackgroundComponent {
  newBoardImage: string = 'https://images.pexels.com/photos/1632780/pexels-photo-1632780.jpeg?auto=compress&cs=tinysrgb&w=600';
  file!: File;
  nameControl: FormControl = new FormControl('');

  constructor(private store: Store<{ board: BoardState }>,
              public dialogRef: MatDialogRef<EditBackgroundComponent>) {
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.newBoardImage = reader.result as string;
    }
  }

  createBoard(): void {
    this.store.dispatch(boardActions.createBoard({board: {name: this.nameControl.value, background: this.file}}));
    this.dialogRef.close();
  }
}
