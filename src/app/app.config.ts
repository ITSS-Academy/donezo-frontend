import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {provideHttpClient} from '@angular/common/http';
import {authReducer} from './ngrx/auth.reducer';
import * as AuthEffects from './ngrx/auth.effects';
import {boardReducer} from './ngrx/board/board.reducer';
import * as BoardEffects from './ngrx/board/board.effects';
import * as ListEffects from './ngrx/list/list.effects';
import {listReducer} from './ngrx/list/list.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),

    provideStore({
      auth: authReducer,
      board: boardReducer,
      list: listReducer
    }), provideEffects(
      [
        AuthEffects,
        BoardEffects,
        ListEffects
      ]
    ), provideFirebaseApp(() => initializeApp({
      "projectId": "todolist-246-25a",
      "appId": "1:874799892031:web:fa30d86d48e86ee60c1a8a",
      "storageBucket": "todolist-246-25a.firebasestorage.app",
      "apiKey": "AIzaSyBpffYg2Pch19gBGONNAoNxkOvHPY0_fZw",
      "authDomain": "todolist-246-25a.firebaseapp.com",
      "messagingSenderId": "874799892031",
      "measurementId": "G-QKN60571QH"
    })), provideAuth(() => getAuth())]
};
