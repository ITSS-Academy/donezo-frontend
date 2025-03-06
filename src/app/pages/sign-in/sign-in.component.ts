import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {AuthState} from '../../ngrx/auth.state';
import {Store} from '@ngrx/store';
import * as authActions from '../../ngrx/auth.actions';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  constructor(private store: Store<{
    auth: AuthState;
  }>) {
  }

  signIn() {
    this.store.dispatch(authActions.login());
  }
}
