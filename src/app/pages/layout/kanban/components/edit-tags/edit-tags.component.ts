import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-edit-tags',
  standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel
    ],
  templateUrl: './edit-tags.component.html',
  styleUrl: './edit-tags.component.scss'
})
export class EditTagsComponent {

  colorArray = [
    {name: 'Red', color: '#FF0000'},
    {name: 'Green', color: '#00FF00'},
    {name: 'Blue', color: '#0000FF'},
    {name: 'Yellow', color: '#FFFF00'},
    {name: 'Orange', color: '#FFA500'},
    {name: 'Purple', color: '#800080'},
    {name: 'Pink', color: '#FFC0CB'},
    {name: 'Brown', color: '#A52A2A'},
    {name: 'White', color: '#FFFFFF'},
    {name: 'Black', color: '#000000'},
    {name: 'Gray', color: '#808080'},
    {name: 'Cyan', color: '#00FFFF'},
    {name: 'Magenta', color: '#FF00FF'},
  ];
}
