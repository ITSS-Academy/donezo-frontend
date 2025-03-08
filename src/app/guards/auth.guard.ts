import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {firstValueFrom} from 'rxjs';
import {authState} from 'rxfire/auth';
import {Store} from '@ngrx/store';
import {AuthState} from '../ngrx/auth.state';
import * as authActions from '../ngrx/auth.actions';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);
  const store = inject(Store<{ auth: AuthState }>);

  // Chờ xác thực Firebase hoàn tất
  const user = await firstValueFrom(authState(auth));

  if (user) {
    const accessToken = await user.getIdToken();
    const idToken = await firstValueFrom(store.select('auth', 'idToken'));

    if (idToken) {
      return true;
    } else {
      // Optionally handle the case where idToken is not available
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
