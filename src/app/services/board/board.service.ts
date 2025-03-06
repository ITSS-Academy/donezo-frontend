import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {BoardState} from '../../ngrx/board/board.state';
import {AuthState} from '../../ngrx/auth.state';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  accessToken!: string

  constructor(private httpClient: HttpClient,
              private store: Store<{
                auth: AuthState
              }>) {
    this.store.select('auth', 'idToken').subscribe((accessToken) => {
      if (accessToken) {
        console.log(accessToken)
        this.accessToken = accessToken
      }
    })
  }

  createBoard(boardName: string, background: File) {
    const formData = new FormData()
    formData.append('name', boardName)
    formData.append('background', background)
    console.log(this.accessToken)
    return this.httpClient.post('http://localhost:3000/board', formData, {
      headers: {
        Authorization: this.accessToken
      }
    })
  }

  getBoards() {
    console.log(this.accessToken)
    return this.httpClient.get('http://localhost:3000/board/get-all-by-uid', {
      headers: {
        Authorization: this.accessToken
      }
    })
  }
}
