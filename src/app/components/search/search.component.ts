import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatIcon,
    MatFormField,
    MaterialModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}
