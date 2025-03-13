import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from '@ngrx/store';
import {BoardState} from '../../../../../ngrx/board/board.state';
import {MatDialogRef} from '@angular/material/dialog';
import * as boardActions from '../../../../../ngrx/board/board.actions';
import {NgClass} from '@angular/common';
import {BackgroundState} from '../../../../../ngrx/background/background.state';
import * as backgroundActions from '../../../../../ngrx/background/background.actions';

@Component({
  selector: 'app-edit-background',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './edit-background.component.html',
  styleUrl: './edit-background.component.scss'
})
export class EditBackgroundComponent implements OnInit {
  newBoardImage: string = 'https://images.pexels.com/photos/1632780/pexels-photo-1632780.jpeg?auto=compress&cs=tinysrgb&w=600';
  file!: File;
  nameControl: FormControl = new FormControl('');

  imageList: any[] = [];
  backgroundId: string = '';

  constructor(private store: Store<{ board: BoardState, background: BackgroundState }>,
              public dialogRef: MatDialogRef<EditBackgroundComponent>) {
    this.store.dispatch(backgroundActions.getBackgrounds());

  }

  boardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl<File | null>(null, [Validators.required]),
  });

  ngOnInit() {
    this.store.select('background', 'backgrounds').subscribe(backgrounds => {
      if (backgrounds) {
        this.imageList = backgrounds;
        this.newBoardImage = this.imageList[0].fileLocation;
        this.backgroundId = this.imageList[0].id;
        console.log('Backgrounds:', this.imageList);
      }
    })
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

  selectBackground(fileLocation: any, id: string) {
    this.newBoardImage = fileLocation
    this.boardForm.get('image')?.setValue(null)
    this.backgroundId = id
  }
}
