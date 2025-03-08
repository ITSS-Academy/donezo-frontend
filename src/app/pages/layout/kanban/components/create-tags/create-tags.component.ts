import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgStyle, NgFor, NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MaterialModule} from '../../../../../shared/modules/material.module';


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
export class CreateTagsComponent {
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
    tagName: new FormControl(''),
    selectedColor: new FormControl('')
  });

  // Hàm chọn màu
  selectColor(color: string) {
    this.tagForm.patchValue({selectedColor: color});
  }

  // Hàm lưu tag
  saveTag() {
    console.log('Tag Name:', this.tagForm.value.tagName);
    console.log('Selected Color:', this.tagForm.value.selectedColor);
  }
}
