import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-board',
  standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel
    ],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss'
})
export class CreateBoardComponent {

}
