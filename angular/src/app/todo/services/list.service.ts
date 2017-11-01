import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { List } from '../models/list';

@Injectable()
export class ListService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getLists(): Observable<List[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.loginService.getToken(),
    );

    return <Observable<List[]>>this.http.get('/list', { headers });
  }
}
