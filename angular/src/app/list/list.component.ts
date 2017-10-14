import { Component, OnInit } from '@angular/core';

import { Todo, Status } from '../models/todo';
import { TodoService } from '../services/todo.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public todos: Observable<Todo[]>;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos = this.todoService.todos;
    this.todoService.load();
  }

  changeStatus(todo: Todo) {
    const cloneTodo = { ...todo };
    cloneTodo.status = todo.status === Status.open ? Status.done : Status.open;
    this.todoService.update(cloneTodo);
  }

  delete(todo: Todo) {
    this.todoService.delete(todo);
  }
}
