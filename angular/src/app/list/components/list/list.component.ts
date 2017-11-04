import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Observable } from 'rxjs/Observable';
import { List } from '../../models/list';
import { DataSource } from '@angular/cdk/table';
import { ListDataSource } from '../../models/list-data-source';

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
