import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo, Status } from '../../models/todo';
import * as moment from 'moment';

@Component({
  selector: 'todo-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  @Input() public todo: Todo;
  @Output() public onStatusChange = new EventEmitter();
  @Output() public onDelete = new EventEmitter();

  public Status = Status;
  constructor() {}

  ngOnInit() {}

  isDue() {
    return moment(this.todo.due).isBefore(moment());
  }

  isDone() {
    return this.todo.status === Status.done;
  }

  changeStatus(todo: Todo) {
    this.onStatusChange.emit(todo);
  }
  delete(todo: Todo) {
    this.onDelete.emit(todo);
  }
}
