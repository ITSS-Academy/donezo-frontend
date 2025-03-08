import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user/user.service';

import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { inject } from '@angular/core';
import {getUserById, getUserByIdFailure, getUserByIdSuccess} from './user.actions';

export const getUserByIdEffect = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(getUserById),
      switchMap((action) =>
        userService.getUserById(action.userId).pipe(
          map((user) => getUserByIdSuccess({ user })),
          catchError((error) => of(getUserByIdFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);
