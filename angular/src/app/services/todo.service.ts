import { Injectable } from '@angular/core';
import { Todo, Status } from '../models/todo';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

  constructor() {
    this.dataStore = { todos: [] };
    this._todos = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
    this.todos = this._todos.asObservable();
  }

  load() {
    if (!this.loaded) {
      this.dataStore.todos = [
        {
          id: 1,
          title: 'aufstehen',
          status: Status.done,
          created: new Date(2017, 9, 1),
        },
        {
          id: 2,
          title: 'essen',
          status: Status.done,
          created: new Date(2017, 9, 2),
        },
        {
          id: 3,
          title: 'schlafen gehen',
          status: Status.open,
          created: new Date(2017, 10, 1),
        },
      ];
      this.id = this.dataStore.todos.length + 1;
      this.loaded = true;
    }
    this._todos.next([...this.dataStore.todos]);
  }

  add(todo: Todo) {
    todo.id = this.id;
    this.dataStore.todos.push(todo);
    this.id += 1;
    this._todos.next([...this.dataStore.todos]);
  }

  update(todo: Todo) {
    const index = this.dataStore.todos.findIndex(
      existingTodo => existingTodo.id === todo.id,
    );
    this.dataStore.todos[index] = todo;
    this._todos.next([...this.dataStore.todos]);
  }

  delete(todo: Todo) {
    const index = this.dataStore.todos.findIndex(item => item.id === todo.id);
    this.dataStore.todos.splice(index, 1);
    this._todos.next([...this.dataStore.todos]);
  }
}
