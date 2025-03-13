import {Component} from '@angular/core';
import {MaterialModule} from '../../../shared/modules/material.module';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../ngrx/auth.state';
import {logout} from '../../../ngrx/auth.actions';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(private store: Store<{ auth: AuthState }>) {
  }

  logout() {
    this.store.dispatch(logout());
  }
}
