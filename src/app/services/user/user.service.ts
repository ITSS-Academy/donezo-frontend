import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {AuthState} from '../../ngrx/auth.state';
import {Store} from '@ngrx/store';
import {UserModel} from '../../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessToken!: string;

  constructor(
    private store: Store<{
      auth: AuthState;
    }>,
    private httpClient: HttpClient,
  ) {
    this.store.select('auth', 'idToken').subscribe((accessToken) => {
      if (accessToken) {
        this.accessToken = accessToken;
      }
    });
  }

  search(email: string) {
    return this.httpClient.get(
      `${environment.apiUrl}/user/search?email=${email}`,
      {
        headers: {
          Authorization: this.accessToken,
        },
      },
    );
  }

  getUserById(userId: string): Observable<UserModel> {
    console.log('dfasdasdfas ', userId);
    return this.httpClient.get(`${environment.apiUrl}/user/${userId}`, {
      headers: {
        Authorization: this.accessToken,
      },
    }).pipe((response) => {
      return response as Observable<UserModel>;
    });
  }

  getUser() {
    return this.httpClient.get(`${environment.apiUrl}/user`, {
      headers: {
        Authorization: this.accessToken,
      },
    });
  }
}
