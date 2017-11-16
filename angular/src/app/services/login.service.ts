import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../user/model/user';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class LoginService {
  private token: string;

  constructor(private http: HttpClient) {}

  doLogin(username: string, password: string): Observable<string> {
    const user = {
      username,
      password,
    };
    return this.http.post('/login', user).map((token: { token: string }) => {
      this.setToken(token.token);
      return token.token;
    });
  }

  doLogout() {
    sessionStorage.removeItem('token');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getUser(): User | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}
