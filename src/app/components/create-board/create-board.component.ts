import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import * as boardActions from '../../ngrx/board/board.actions';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss'
})
export class CreateBoardComponent {
  newBoardImage: string = 'https://images.pexels.com/photos/1632780/pexels-photo-1632780.jpeg?auto=compress&cs=tinysrgb&w=600';
  file!: File;
  nameControl: FormControl = new FormControl('');

  constructor(private store: Store<{ board: BoardState }>,
              public dialogRef: MatDialogRef<CreateBoardComponent>) {
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
