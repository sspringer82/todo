import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../../services/login.service';
import { HttpHeaders } from '@angular/common/http';

export abstract class BaseService<T> {
  protected loaded = false;
  protected _items: BehaviorSubject<T[]>;
  protected dataStore: {
    items: T[];
  };

  constructor(
    protected http: HttpClient,
    protected loginService: LoginService,
  ) {
    this.dataStore = { items: [] };
    this._items = <BehaviorSubject<T[]>>new BehaviorSubject([]);
  }

  protected getAuthHeader(
    headers: HttpHeaders = new HttpHeaders(),
  ): HttpHeaders {
    return headers.set(
      'Authorization',
      'Bearer ' + this.loginService.getToken(),
    );
  }

  abstract load(): Observable<T[]>;
  abstract add(item: T): Observable<T>;
  abstract update(item: T): Observable<T>;
  abstract delete(item: T): Observable<T>;
}
