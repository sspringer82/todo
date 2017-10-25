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
    Observable.of(!this.loaded)
      .mergeMap(loaded => {
        if (loaded) {
          return this.http.get('/todo', { headers: this.getAuthHeader() });
        } else {
          return Observable.of(this.dataStore.todos);
        }
      })
      .subscribe((todos: Todo[]) => {
        this.loaded = true;
        this.dataStore.todos = todos;
        this._todos.next([...this.dataStore.todos]);
      });
  }

  add(todo: Todo) {
    this.http.post('/todo', todo).subscribe((newTodo: Todo) => {
      this.dataStore.todos.push(newTodo);
      this._todos.next([...this.dataStore.todos]);
    });
  }

  update(todo: Todo) {
    this.http.put(`/todo/${todo.id}`, todo).subscribe((updatedTodo: Todo) => {
      const index = this.dataStore.todos.findIndex(
        existingTodo => existingTodo.id === todo.id,
      );
      this.dataStore.todos[index] = todo;
      this._todos.next([...this.dataStore.todos]);
    });
  }

  delete(todo: Todo) {
    this.http.delete(`/todo/${todo.id}`).subscribe(() => {
      const index = this.dataStore.todos.findIndex(item => item.id === todo.id);
      this.dataStore.todos.splice(index, 1);
      this._todos.next([...this.dataStore.todos]);
    });
  }
}
