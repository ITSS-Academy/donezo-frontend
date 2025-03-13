import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {environment} from '../../../environments/environment.development';
import {AuthState} from '../../ngrx/auth.state';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  accessToken!: string;

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ auth: AuthState }>,
  ) {
    this.store.select('auth').subscribe((auth) => {
      this.accessToken = auth.idToken;
    });
  }

  getBackground(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/background/${id}`, {
      headers: {Authorization: this.accessToken},
      responseType: 'text',
    });
  }

  getAllBackgrounds(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/background/all`, {
      headers: {Authorization: this.accessToken},
    });
  }

}
