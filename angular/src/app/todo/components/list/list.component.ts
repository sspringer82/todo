import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Todo, Status } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ListService } from '../../../list/services/list.service';
import { List } from '../../../list/models/list';

import * as moment from 'moment';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public todos: Observable<Todo[]>;
  public lists: Observable<List[]>;
  public showOnlyOpen = new FormControl();
  public listSelect = new FormControl();
  public orderSelect = new FormControl();
  public orders = ['order', 'due today', 'due next'];
  public isControlsClosed = true;
  private moveItems = true;
  public drawerOpen?: number;
  public activeTodo: Todo;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private listService: ListService,
    private configService: ConfigService,
  ) {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown($event: KeyboardEvent) {
    if ($event.code === 'KeyN') {
      $event.preventDefault();
      this.router.navigate(['/todo/form']);
    }
  }

  handleError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.router.navigate(['/login']);
    } else {
      console.log('Whoops an error occured');
    }
  }

  ngOnInit() {
    this.listSelect.valueChanges.subscribe((list: string) => {
      this.configService.selectedList = list;
    });

    this.todos = this.todoService.items
      .combineLatest(
        this.listSelect.valueChanges,
        this.showOnlyOpen.valueChanges.startWith(false),
        this.orderSelect.valueChanges,
      )
      .do(([todos, list, showOnlyOpen, order]) => {
        this.moveItems = showOnlyOpen === false && order === 'order';
      })
      .map(([todos, list, showOnlyOpen, order]) => {
        return todos
          .filter((todo: Todo) => {
            if (
              (order === 'order' && showOnlyOpen) ||
              ['due next', 'due today'].includes(order)
            ) {
              return todo.status === Status.open;
            }
            return true;
          })
          .filter((todo: Todo) => {
            if (order === 'due today') {
              const today = moment().set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 99,
              });
              const yesterday = today.clone().subtract(1, 'day');
              const result = moment(todo.due).isBetween(yesterday, today);
              return result;
            }
            return true;
          })
          .filter((todo: Todo) => {
            if (order === 'due next') {
              const am = moment()
                .subtract(1, 'day')
                .set({
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                });
              return moment(todo.due).isAfter(am);
            }
            return true;
          })
          .filter((todo: Todo) => todo.list === list)
          .sort((t1: Todo, t2: Todo) => t1.sequence - t2.sequence);
      });

    this.todoService.load().subscribe(null, e => this.handleError(e));
    this.lists = this.listService.getLists().map((list: List[]) => {
      if (list.length > 0) {
        this.listSelect.setValue(
          this.configService.selectedList || list[0].title,
        );
      }
      return list;
    });
    Promise.resolve().then(() => this.orderSelect.setValue('order'));
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

  move(event: { direction: string; todo: Todo }) {
    this.todoService
      .move(event.direction, event.todo)
      .subscribe(null, e => this.handleError(e));
  }

  public toggleControls() {
    this.isControlsClosed = !this.isControlsClosed;
  }

  toggleDrawer(todo: Todo) {
    if (this.drawerOpen === todo.id) {
      this.drawerOpen = null;
    } else {
      this.drawerOpen = todo.id;
    }
  }

  activate(todo: Todo) {
    if (this.activeTodo === todo) {
      this.activeTodo = null;
    } else {
      this.activeTodo = todo;
    }
  }
}
