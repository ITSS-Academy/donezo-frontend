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
import {userReducer} from './ngrx/user/user.reducer';
import * as UserEffects from './ngrx/user/user.effects';
import {notificationsReducer} from './ngrx/notifications/notifications.reducer';
import {labelReducer} from './ngrx/label/label.reducer';
import {cardReducer} from './ngrx/card/card.reducer';
import {checklistItemReducer} from './ngrx/checklistItem/checklistItem.reducer';
import {commentReducer} from './ngrx/comment/comment.reducer';
import * as notificationsEffects from './ngrx/notifications/notifications.effects';
import * as labelEffects from './ngrx/label/label.effects';
import * as cardEffects from './ngrx/card/card.effects';
import * as checklistItemEffects from './ngrx/checklistItem/checklistItem.effects';
import * as CommentEffects from './ngrx/comment/comment.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),

    provideStore({
      auth: authReducer,
      board: boardReducer,
      user: userReducer,
      list: listReducer,
      notifications: notificationsReducer,
      label: labelReducer,
      card: cardReducer,
      checklistItem: checklistItemReducer,
      comment: commentReducer
    }),
    provideEffects([
      AuthEffects,
      BoardEffects,
      UserEffects,
      ListEffects,
      notificationsEffects,
      labelEffects,
      cardEffects,
      checklistItemEffects,
      CommentEffects
    ]),
    provideFirebaseApp(() => initializeApp({
      "projectId": "todolist-246-25a",
      "appId": "1:874799892031:web:fa30d86d48e86ee60c1a8a",
      "storageBucket": "todolist-246-25a.firebasestorage.app",
      "apiKey": "AIzaSyBpffYg2Pch19gBGONNAoNxkOvHPY0_fZw",
      "authDomain": "todolist-246-25a.firebaseapp.com",
      "messagingSenderId": "874799892031",
      "measurementId": "G-QKN60571QH"
    })), provideAuth(() => getAuth())]
};
