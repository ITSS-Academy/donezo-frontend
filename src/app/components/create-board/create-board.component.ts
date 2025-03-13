import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import * as boardActions from '../../ngrx/board/board.actions';
import {MaterialModule} from '../../shared/modules/material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {BackgroundState} from '../../ngrx/background/background.state';
import * as backgroundActions from '../../ngrx/background/background.actions';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    NgStyle,
    NgClass
  ],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss'
})
export class CreateBoardComponent implements OnInit, OnDestroy {
  newBoardImage: string = '';
  file!: File;

  constructor(private store: Store<{ board: BoardState, background: BackgroundState }>,
              public dialogRef: MatDialogRef<CreateBoardComponent>) {
    this.store.dispatch(backgroundActions.getBackgrounds());
  }

  boardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl<File | null>(null, [Validators.required]),
  });

  imageList: any[] = [];
  imagePreview: string = '';
  backgroundId: string = '';

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

  ngOnDestroy() {

  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.newBoardImage = reader.result as string;
    }
  }

  createBoard() {
    if (!this.boardForm.get('title')?.valid) {
      alert('')
      return
    }

    if (!this.newBoardImage || this.newBoardImage == '') {
      alert('')
      return
    }

    if (
      this.boardForm.get('image')?.valid
    ) {
      console.log(
        'Creating board with title:',
        this.boardForm.get('title')?.value,
      );

      this.store.dispatch(
        boardActions.createBoard({
          board: {
            name: this.boardForm.get('title')?.value ?? 'Board Name',
            background: this.boardForm.get('image')!.value,
          },
        }),
      );

      this.dialogRef.close();
    } else {
      this.store.dispatch(
        boardActions.createBoard({
          board: {
            name: this.boardForm.get('title')?.value ?? 'Board Name',
            backgroundId: this.backgroundId,
          },
        }),
      );
      this.dialogRef.close();
    }
  }


  selectBackground(fileLocation: any, id: string) {
    this.newBoardImage = fileLocation
    this.boardForm.get('image')?.setValue(null)
    this.backgroundId = id
  }
}
