import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { List } from '../models/list';
import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class ListService extends BaseService<List> {
  protected baseUrl = 'list';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getLists(): Observable<List[]> {
    return <Observable<List[]>>this.http.get('/list');
  }
}
