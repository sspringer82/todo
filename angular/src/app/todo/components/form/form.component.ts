import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Todo, Status } from '../../models/todo';
import {
  ActivatedRoute,
  Router,
  ParamMap,
  NavigationEnd,
} from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { List } from '../../../list/models/list';
import { ListService } from '../../../list/services/list.service';

@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('title') private titleField: ElementRef;

  public todo = new Todo();
  public Status = Status;
  public lists: Observable<List[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService,
    private listService: ListService,
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.lists = this.listService.getLists();
    if (!isNaN(id)) {
      this.todoService.load();
      this.todoService.items.subscribe((todos: Todo[]) => {
        Observable.from(todos)
          .filter((todo: Todo) => {
            return todo.id === id;
          })
          .subscribe((todo: Todo) => {
            this.todo = todo;
          });
      });
    } else {
      this.todo.status = Status.open;
      this.todo.created = new Date();
    }
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.titleField.nativeElement.focus());
  }

  save() {
    let observable: Observable<Todo>;
    if (!this.todo.id) {
      observable = this.todoService.add(this.todo);
    } else {
      observable = this.todoService.update(this.todo);
    }

    observable.subscribe(() => {
      this.router.navigate(['/todo/list']);
    });
  }
}
