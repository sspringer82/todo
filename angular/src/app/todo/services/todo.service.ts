import { Injectable } from '@angular/core';
import { Todo, Status } from '../models/todo';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class TodoService extends BaseService<Todo> {
  protected baseUrl = '/todo';

  constructor(
    protected http: HttpClient,
    protected loginService: LoginService,
  ) {
    super(http, loginService);
  }
}
