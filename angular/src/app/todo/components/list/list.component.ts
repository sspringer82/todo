import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Todo, Status } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ListService } from '../../../list/services/list.service';
import { List } from '../../../list/models/list';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public todos: Observable<Todo[]>;
  public lists: Observable<List[]>;
  public showOnlyOpen = new FormControl();
  public listSelect = new FormControl();

  constructor(
    private todoService: TodoService,
    private router: Router,
    private listService: ListService,
  ) {}

  handleError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.router.navigate(['/login']);
    } else {
      console.log('Whoops an error occured');
    }
  }

  ngOnInit() {
    this.todos = this.todoService.todos
      .combineLatest(
        this.listSelect.valueChanges,
        this.showOnlyOpen.valueChanges.startWith(false),
      )
      .map(([todos, list, showOnlyOpen]) => {
        return todos.filter((todo: Todo) => {
          let result = true;
          if (showOnlyOpen) {
            result = todo.status === Status.open;
          }
          return result && todo.list === list;
        });
      });

    this.todoService.load().subscribe(null, e => this.handleError(e));
    this.lists = this.listService.getLists().map((list: List[]) => {
      this.listSelect.setValue(list[0].title);
      return list;
    });
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
