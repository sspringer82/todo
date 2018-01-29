import { Injectable } from '@angular/core';
import { Todo, Status } from '../models/todo';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';

import { combineLatest } from 'rxjs/operators';

@Injectable()
export class TodoService extends BaseService<Todo> {
  protected baseUrl = '/todo';

  constructor(protected http: HttpClient) {
    super(http);
  }

  archive(todo: Todo) {
    return this.update({ ...todo, ...{ sequence: 0, archived: 1 } });
  }

  move(direction: string, todo: Todo) {
    let prevTodo;
    const numOfListItems = this.dataStore.items.reduce(
      (prev: number, curr: Todo) => {
        return curr.list === todo.list ? ++prev : prev;
      },
      0,
    );

    if (direction === 'up' && todo.sequence > 1) {
      prevTodo = this.dataStore.items.find(
        (item: Todo) =>
          todo.sequence - 1 === item.sequence && todo.list === item.list,
      );
      todo.sequence -= 1;
      prevTodo.sequence += 1;
    } else if (direction === 'down' && todo.sequence < numOfListItems) {
      prevTodo = this.dataStore.items.find(
        (item: Todo) =>
          todo.sequence + 1 === item.sequence && todo.list === item.list,
      );
      todo.sequence += 1;
      prevTodo.sequence -= 1;
    }
    if (prevTodo) {
      const data = [todo, prevTodo];
      return this.http.put(`${this.baseUrl}/update`, data).map((): Todo[] => {
        let index = this.dataStore.items.findIndex(
          existingItem => existingItem.id === todo.id,
        );
        this.dataStore.items[index] = todo;
        index = this.dataStore.items.findIndex(
          existingItem => existingItem.id === prevTodo.id,
        );
        this.dataStore.items[index] = prevTodo;
        this._items.next([...this.dataStore.items]);
        return data;
      });
    }
    return Observable.of();
  }
}
