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

  move(direction: string, todo: Todo) {
    let prevTodo;
    if (direction === 'up') {
      prevTodo = this.dataStore.items.find(
        (item: Todo) => todo.sequence - 1 === item.sequence,
      );
      todo.sequence -= 1;
      prevTodo.sequence += 1;
    } else {
      prevTodo = this.dataStore.items.find(
        (item: Todo) => todo.sequence + 1 === item.sequence,
      );
      todo.sequence += 1;
      prevTodo.sequence -= 1;
    }
    return this.update(todo).combineLatest(this.update(prevTodo));
  }
}
