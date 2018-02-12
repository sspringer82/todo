import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user';
import { DataSource } from '@angular/cdk/table';
import { UserDataSource } from '../../model/user-data-source';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public lists: Observable<User[]>;
  public dataSource: UserDataSource;
  public displayedColumns = [
    'username',
    'isActive',
    'isAdmin',
    'edit',
    'delete',
  ];

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    this.lists = this.userService.items;
    this.dataSource = new UserDataSource(this.lists);
    this.userService
      .load()
      .subscribe(null, e => this.errorService.handleError(e));
  }

  public delete(listItem: User) {
    this.userService
      .delete(listItem)
      .subscribe(null, e => this.errorService.handleError(e));
  }

  public changeIsAdmin(listItem: User) {
    const isAdmin = listItem.isAdmin === 1 ? 0 : 1;
    this.userService
      .update({ ...listItem, isAdmin })
      .subscribe(null, e => this.errorService.handleError(e));
  }

  public changeIsActive(listItem: User) {
    const isActive = listItem.isActive === 1 ? 0 : 1;
    this.userService
      .update({ ...listItem, isActive })
      .subscribe(null, e => this.errorService.handleError(e));
  }
}
