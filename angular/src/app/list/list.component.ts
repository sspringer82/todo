import { Component, OnInit } from '@angular/core';

import { Todo, Status } from '../models/todo';
import { TodoService } from '../services/todo.service';

import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public todos: Observable<Todo[]>;

  constructor(private todoService: TodoService, private router: Router) {}

  handleError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.router.navigate(['/login']);
    } else {
      console.log('Whoops an error occured');
    }
  }

  ngOnInit() {
    this.todos = this.todoService.todos;
    this.todoService.load().subscribe(null, e => this.handleError(e));
  }

  changeStatus(todo: Todo) {
    const cloneTodo = { ...todo };
    cloneTodo.status = todo.status === Status.open ? Status.done : Status.open;
    this.todoService
      .update(cloneTodo)
      .subscribe(null, e => this.handleError(e));
  }

  delete(todo: Todo) {
    this.todoService.delete(todo).subscribe(null, e => this.handleError(e));
  }
}
