import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Observable } from 'rxjs/Observable';
import { List } from '../../models/list';
import { DataSource } from '@angular/cdk/table';
import { ListDataSource } from '../../models/list-data-source';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public lists: Observable<List[]>;
  public dataSource: ListDataSource;
  public displayedColumns = ['title', 'edit', 'delete'];

  constructor(
    private listService: ListService,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    this.lists = this.listService.items;
    this.dataSource = new ListDataSource(this.lists);
    this.listService
      .load()
      .subscribe(null, e => this.errorService.handleError(e));
  }

  public delete(listItem: List) {
    if (confirm(`Delete ${listItem.title}?`)) {
      this.listService
        .delete(listItem)
        .subscribe(null, e => this.errorService.handleError(e));
    }
  }
}
