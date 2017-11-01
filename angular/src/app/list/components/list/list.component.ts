import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Observable } from 'rxjs/Observable';
import { List } from '../../models/list';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public lists: Observable<List[]>;
  public dataSource: ListDataSource;
  public displayedColumns = ['title', 'edit', 'delete'];

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.lists = this.listService.items;
    this.dataSource = new ListDataSource(this.lists);
    this.listService.load().subscribe(null, e => {
      console.log(e);
    });
  }

  public delete(listItem: List) {
    this.listService.delete(listItem).subscribe(null, e => console.log(e));
  }
}

class ListDataSource extends DataSource<List> {
  constructor(private lists: Observable<List[]>) {
    super();
  }

  connect(): Observable<List[]> {
    return this.lists;
  }
  disconnect(): void {}
}
