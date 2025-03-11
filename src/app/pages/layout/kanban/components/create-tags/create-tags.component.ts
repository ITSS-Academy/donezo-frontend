import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgStyle, NgFor, NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MaterialModule} from '../../../../../shared/modules/material.module';
import * as labelActions from '../../../../../ngrx/label/label.actions';
import {Store} from '@ngrx/store';
import {LabelState} from '../../../../../ngrx/label/label.state';
import {BoardState} from '../../../../../ngrx/board/board.state';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-create-tags',
  standalone: true,
  imports: [
    MatIcon,
    MatFormField,
    MatInput,
    NgStyle,
    MatButton,
    ReactiveFormsModule,
    NgFor,
    NgClass,
    MaterialModule
  ],
  templateUrl: './create-tags.component.html',
  styleUrl: './create-tags.component.scss'
})
export class CreateTagsComponent implements OnInit,OnDestroy{
  private dialogRef: MatDialogRef<CreateTagsComponent> = inject(MatDialogRef);
  constructor(private store: Store<{
    label:  LabelState;
    board: BoardState
  }>) {
  }

  boardId!: string;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('board','board').subscribe((board) => {
        if(board){
          this.boardId = board.id!;
        }
      }),
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }

  // Mảng màu
  colorArray = [
    {name: 'Deep Red', color: '#D40000'},
    {name: 'Orange', color: '#F06A11'},
    {name: 'Purple', color: '#9747FF'},
    {name: 'Magenta', color: '#D3009B'},
    {name: 'Yellow', color: '#D3CD19'},
    {name: 'Teal', color: '#19C4B3'},
    {name: 'Gray', color: '#AFAFAF'},
    {name: 'Dark Purple', color: '#5D5791'},
    {name: 'Lavender', color: '#A08CFF'},
    {name: 'Dark Blue', color: '#004D96'},
    {name: 'Pink', color: '#F235EB'},
    {name: 'Lime Green', color: '#75D329'},
    {name: 'Royal Blue', color: '#212CC9'},
    {name: 'Violet', color: '#8E11E7'},
    {name: 'Olive Green', color: '#79B41A'},
  ];


  // Form Reactive
  tagForm = new FormGroup({
    tagName: new FormControl('',[Validators.required]),
    selectedColor: new FormControl('',[Validators.required])
  });

  // Hàm chọn màu
  selectColor(color: string) {
    this.tagForm.patchValue({selectedColor: color});
  }

  cancel() {
    this.dialogRef.close();
  }

  // Hàm lưu tag
  saveTag() {
    if(this.tagForm.valid){
      this.store.dispatch(labelActions.createLabel({
        label: {
          name: this.tagForm.get('tagName')?.value!,
          color: this.tagForm.get('selectedColor')?.value!,
          boardId: this.boardId
        }
      }));
    }else {
      alert('Please fill in the tag name and select a color');
    }
  }
}
