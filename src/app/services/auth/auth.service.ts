import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth, GoogleAuthProvider, signInWithPopup, signOut} from '@angular/fire/auth';
import {catchError, from, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private auth: Auth,
  ) {
  }


  signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(credential => {
        console.log(credential.user.getIdToken())
        return credential.user.getIdToken()
      }));
  }

  login(accessToken: string) {
    console.log(accessToken)
    return this.httpClient.post('http://localhost:3000/auth/login', {accessToken: accessToken}, {
      headers: {
        'Authorization': accessToken
      }
    });
  }

  logout() {
    return from(signOut(this.auth)).pipe(
      catchError((error) => {
        return of(error);
      }),
    );
  }
}
