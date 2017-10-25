import { Injectable } from '@angular/core';
import { Todo, Status } from '../models/todo';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TodoService {
  private loaded = false;
  private id: number;
  public todos: Observable<Todo[]>;
  private _todos: BehaviorSubject<Todo[]>;
  private baseUrl: string;
  private dataStore: {
    todos: Todo[];
  };

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.dataStore = { todos: [] };
    this._todos = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
    this.todos = this._todos.asObservable();
  }

  getAuthHeader(headers: HttpHeaders = new HttpHeaders()): HttpHeaders {
    return headers.set(
      'Authorization',
      'Bearer ' + this.loginService.getToken(),
    );
  }

  load() {
    return Observable.of(!this.loaded)
      .mergeMap(loaded => {
        if (loaded) {
          return this.http.get('/todo', { headers: this.getAuthHeader() });
        } else {
          return Observable.of(this.dataStore.todos);
        }
      })
      .map((todos: Todo[]) => {
        this.loaded = true;
        this.dataStore.todos = todos;
        this._todos.next([...this.dataStore.todos]);
        return todos;
      });
  }

  add(todo: Todo): Observable<Todo> {
    return this.http
      .post('/todo', todo, { headers: this.getAuthHeader() })
      .map((newTodo: Todo): Todo => {
        this.dataStore.todos.push(newTodo);
        this._todos.next([...this.dataStore.todos]);
        return newTodo;
      });
  }

  update(todo: Todo): Observable<Todo> {
    return this.http
      .put(`/todo/${todo.id}`, todo, { headers: this.getAuthHeader() })
      .map((updatedTodo: Todo): Todo => {
        const index = this.dataStore.todos.findIndex(
          existingTodo => existingTodo.id === todo.id,
        );
        this.dataStore.todos[index] = todo;
        this._todos.next([...this.dataStore.todos]);
        return updatedTodo;
      });
  }

  delete(todo: Todo): Observable<Todo> {
    return this.http
      .delete(`/todo/${todo.id}`, { headers: this.getAuthHeader() })
      .map((): Todo => {
        const index = this.dataStore.todos.findIndex(
          item => item.id === todo.id,
        );
        this.dataStore.todos.splice(index, 1);
        this._todos.next([...this.dataStore.todos]);
        return todo;
      });
  }
}
