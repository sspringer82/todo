import { Injectable } from '@angular/core';
import { Todo, Status } from '../models/todo';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class TodoService extends BaseService<Todo> {
  public todos: Observable<Todo[]>;

  constructor(
    protected http: HttpClient,
    protected loginService: LoginService,
  ) {
    super(http, loginService);
    this.todos = this._items.asObservable();
  }

  load() {
    return Observable.of(!this.loaded)
      .mergeMap(loaded => {
        if (loaded) {
          return this.http.get('/todo', { headers: this.getAuthHeader() });
        } else {
          return Observable.of(this.dataStore.items);
        }
      })
      .map((todos: Todo[]) => {
        this.loaded = true;
        this.dataStore.items = todos;
        this._items.next([...this.dataStore.items]);
        return todos;
      });
  }

  add(todo: Todo): Observable<Todo> {
    return this.http
      .post('/todo', todo, { headers: this.getAuthHeader() })
      .map((newTodo: Todo): Todo => {
        this.dataStore.items.push(newTodo);
        this._items.next([...this.dataStore.items]);
        return newTodo;
      });
  }

  update(todo: Todo): Observable<Todo> {
    return this.http
      .put(`/todo/${todo.id}`, todo, { headers: this.getAuthHeader() })
      .map((updatedTodo: Todo): Todo => {
        const index = this.dataStore.items.findIndex(
          existingTodo => existingTodo.id === todo.id,
        );
        this.dataStore.items[index] = todo;
        this._items.next([...this.dataStore.items]);
        return updatedTodo;
      });
  }

  delete(todo: Todo): Observable<Todo> {
    return this.http
      .delete(`/todo/${todo.id}`, { headers: this.getAuthHeader() })
      .map((): Todo => {
        const index = this.dataStore.items.findIndex(
          item => item.id === todo.id,
        );
        this.dataStore.items.splice(index, 1);
        this._items.next([...this.dataStore.items]);
        return todo;
      });
  }
}
