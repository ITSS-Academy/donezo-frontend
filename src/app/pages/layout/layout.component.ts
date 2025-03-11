import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {NotificationsComponent} from "../../components/notifications/notifications.component";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {SearchComponent} from "../../components/search/search.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {KanbanNavbarComponent} from './kanban/components/kanban-navbar/kanban-navbar.component';
import {Store} from '@ngrx/store';
import {UserState} from '../../ngrx/user/user.state';
import * as userActions from '../../ngrx/user/user.actions';
import {Subscription} from 'rxjs';
import {AuthState} from '../../ngrx/auth.state';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    NotificationsComponent,
    RouterOutlet,
    SearchComponent,
    SidebarComponent,
    KanbanNavbarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;

  isDrawerOpen = false;
  activeDrawer: string | null = null;
  showKanbanNavbar = false;
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<{
      user: UserState,
      auth: AuthState
    }>
  ) {
    this.store.dispatch(userActions.getUser());
  }

  ngOnInit() {

    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.showKanbanNavbar = this.router.url.startsWith('/kanban');
        }
      }),
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleDrawer(drawerName: string) {
    console.log(drawerName);
    console.log(this.activeDrawer);
    if (this.activeDrawer === drawerName) {
      this.isDrawerOpen = false;
      this.activeDrawer = null;
      this.drawer.close()
    } else if (drawerName == 'Search' || drawerName == 'Notifications') {
      this.activeDrawer = drawerName;
      this.isDrawerOpen = true;
      if (!this.drawer.opened) {
        this.drawer.open();
      }
    } else {
      this.isDrawerOpen = false;
      this.activeDrawer = null;
      this.drawer.close()
    }
  }

  resetActiveName() {
    this.activeDrawer = null;
    this.isDrawerOpen = false;
  }


}
