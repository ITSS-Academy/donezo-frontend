import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MaterialModule} from './shared/modules/material.module';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SearchComponent} from './components/search/search.component';
import {MatDrawer} from '@angular/material/sidenav';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {NgStyle} from '@angular/common';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {AuthState} from './ngrx/auth.state';
import {Store} from '@ngrx/store';
import * as authActions from './ngrx/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, SidebarComponent, SearchComponent, NotificationsComponent, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'donezo_frontend';

  constructor(private router: Router,
              private auth: Auth,
              private store: Store<{ auth: AuthState }>) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log(user)
        const accessToken = await user.getIdToken();
        console.log(accessToken)
        this.store.dispatch(authActions.storeAccessToken({accessToken: accessToken}));
      } else {
        this.router.navigate(['/login']);
        console.log('User is signed out');
      }
    })
  }

  ngOnInit() {

  }


}
