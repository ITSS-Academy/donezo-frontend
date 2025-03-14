import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
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
import {Subscription} from 'rxjs';
import {AuthState} from '../../../../../ngrx/auth.state';

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
export class EditBackgroundComponent implements OnInit, OnDestroy {
  newBoardImage: string = '';


  imageUrl: string = '';
  file: File | null = null;
  boardId: string = '';
  backgroundId: string = '';
  imagePreview: string | null = null;
  subscriptions: Subscription[] = [];

  imageBackgrounds: { id: string; fileLocation: string }[] = [];

  form = new FormGroup({
    image: new FormControl<File | null>(null),
  });

  constructor(
    private dialogRef: MatDialogRef<EditBackgroundComponent>,
    private store: Store<{
      auth: AuthState;
      board: BoardState;
      background: BackgroundState;
    }>
  ) {
    this.store.dispatch(backgroundActions.getBackgrounds());
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('board', 'board').subscribe((board) => {
        if (board?.id) {
          this.boardId = board.id;
        }
      }),
      this.store.select('background', 'backgrounds').subscribe((backgrounds) => {
        if (backgrounds?.length) {
          this.imageBackgrounds = [...backgrounds];
          this.onBackgroundSelected(backgrounds[0].fileLocation);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  selectBackground(fileLocation: string, id: string) {
    this.newBoardImage = fileLocation;
    this.backgroundId = id;
    this.file = null;
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.file = input.files[0];
      this.imageUrl = '';

      const reader = new FileReader();
      reader.onload = () => {
        this.newBoardImage = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  onAccept() {
    if (!this.imageUrl && !this.file) {
      // Thông báo lỗi (có thể dùng MatSnackBar)
      return;
    }

    if (this.file) {
      this.dispatchBackgroundChange(this.file);
    } else if (this.backgroundId) {
      this.dispatchBackgroundChange(this.backgroundId);
    }

    this.dialogRef.close();
  }

  dispatchBackgroundChange(background: File | string) {
    if ( background instanceof File) {
      this.store.dispatch(
        boardActions.changeBoardBackground({
          boardId: this.boardId,
          background: background,
        })
      );
    }else {
      this.store.dispatch(
        boardActions.changeBoardBackground({
          boardId: this.boardId,
          backgroundId: background,
        })
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onBackgroundSelected(fileLocation: string) {
    this.imageUrl = fileLocation;
    this.imagePreview = fileLocation;
  }
}
