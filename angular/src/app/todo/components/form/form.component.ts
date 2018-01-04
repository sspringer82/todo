import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Todo, Status } from '../../models/todo';
import {
  ActivatedRoute,
  Router,
  ParamMap,
  NavigationEnd,
} from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Subscription } from 'rxjs/Subscription';
import { List } from '../../../list/models/list';
import { ListService } from '../../../list/services/list.service';
import { ConfigService } from '../../../services/config.service';

import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs/Observable/from';

@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('title') private titleField: ElementRef;

  public header = 'Create a new todo';
  public todo = new Todo();
  public due: Date;
  public Status = Status;
  public lists: Observable<List[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService,
    private listService: ListService,
    private configService: ConfigService,
  ) {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown($event: KeyboardEvent) {
    if ($event.code === 'Escape') {
      $event.preventDefault();
      this.router.navigate(['/todo/list']);
    }
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.lists = this.listService.getLists();
    if (!isNaN(id)) {
      this.header = 'Update your todo';
      this.todoService.load();
      this.todoService.items.subscribe((todos: Todo[]) => {
        Observable.from(todos)
          .filter((todo: Todo) => {
            return todo.id === id;
          })
          .subscribe((todo: Todo) => {
            this.todo = todo;
            if (this.todo.due) {
              this.due = new Date(this.todo.due);
            }
          });
      });
    } else {
      this.todo.list = this.configService.selectedList;
      this.todo.status = Status.open;
      this.todo.created = Date.now();
    }
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.titleField.nativeElement.focus());
  }

  save() {
    let observable: Observable<Todo>;
    delete this.todo.due;
    if (this.due) {
      this.todo.due = this.due.getTime();
    }
    if (!this.todo.id) {
      this.todo.archived = 0;
      observable = this.todoService.add(this.todo);
    } else {
      observable = this.todoService.update(this.todo);
    }

    observable.subscribe(() => {
      this.router.navigate(['/todo/list']);
    });
  }
}
