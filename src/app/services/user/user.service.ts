import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  getUserById(userId: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`/user/${userId}`);
    console.log();
  }
}
