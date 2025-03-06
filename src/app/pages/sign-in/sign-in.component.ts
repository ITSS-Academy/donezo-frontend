import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {AuthState} from '../../ngrx/auth.state';
import {Store} from '@ngrx/store';
import * as authActions from '../../ngrx/auth.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  constructor(private store: Store<{
                auth: AuthState;
              }>,
              private router: Router) {
    this.store.select('auth').subscribe((auth) => {
      if (auth.idToken) {
        this.router.navigate(['/home']);
      }
    })
  }

  signIn() {
    this.store.dispatch(authActions.login());
  }
}
