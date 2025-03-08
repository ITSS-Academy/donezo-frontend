import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';
import {SignInComponent} from './pages/sign-in/sign-in.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/layout/layout.routes').then(m => m.LayoutRoutes),
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
