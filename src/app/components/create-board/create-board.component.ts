import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';

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
  newBoardImage: string = 'https://images.pexels.com/photos/1632780/pexels-photo-1632780.jpeg?auto=compress&cs=tinysrgb&w=600';
  file!: File;

  onFileChange(event: any): void {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.newBoardImage = reader.result as string;
    }
  }
}
