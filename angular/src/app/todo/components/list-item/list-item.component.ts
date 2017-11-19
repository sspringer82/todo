import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo, Status } from '../../models/todo';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';

@Component({
  selector: 'todo-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() public todo: Todo;
  @Output() public onStatusChange = new EventEmitter();
  @Output() public onDelete = new EventEmitter();

  public isDrawerClosed = true;
  public Status = Status;
  constructor(public dialog: MatDialog) {}

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

  openDialog() {
    this.dialog.open(DescriptionDialogComponent, {
      width: '250px',
      data: { todo: this.todo },
    });
  }

  toggleDrawer() {
    this.isDrawerClosed = !this.isDrawerClosed;
  }
}
