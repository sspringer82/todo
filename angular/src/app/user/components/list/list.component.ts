import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user';
import { DataSource } from '@angular/cdk/table';
import { UserDataSource } from '../../model/user-data-source';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.lists = this.userService.items;
    this.dataSource = new UserDataSource(this.lists);
    this.userService.load().subscribe(null, e => {
      console.log(e);
    });
  }

  public delete(listItem: User) {
    this.userService.delete(listItem).subscribe(null, e => console.log(e));
  }

  public changeIsAdmin(listItem: User) {
    const isAdmin = listItem.isAdmin === 1 ? 0 : 1;
    this.userService
      .update({ ...listItem, isAdmin })
      .subscribe(null, e => console.log(e));
  }

  public changeIsActive(listItem: User) {
    const isActive = listItem.isActive === 1 ? 0 : 1;
    this.userService
      .update({ ...listItem, isActive })
      .subscribe(null, e => console.log(e));
  }
}
