import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MaterialModule} from '../../shared/modules/material.module';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {Store} from '@ngrx/store';
import {UserState} from '../../ngrx/user/user.state';
import {getUserById} from '../../ngrx/user/user.actions';

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
