import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MaterialModule} from '../../shared/modules/material.module';
import {map, Observable, startWith} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {Store} from '@ngrx/store';
import {UserState} from '../../ngrx/user/user.state';
import {getUserById} from '../../ngrx/user/user.actions';
import {AsyncPipe} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {user} from '@angular/fire/auth';
// import firebase from 'firebase/compat';



export interface User {
  name: string;
}
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    // MatIcon,
    MatFormField,
    MaterialModule,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'All Board'}, {name: 'All tasks'}, {name: 'Personal'}, {name:' trip to  japan '}  ];
  filteredOptions: Observable<User[]> | undefined;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  protected readonly user = user;
  protected readonly name = name;

  drawer(name: string) {

  }
}
