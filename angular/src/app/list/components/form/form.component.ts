import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { List } from '../../models/list';
import { Router, ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('title') private titleField: ElementRef;

  public list = new List();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listService: ListService,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (!isNaN(id)) {
      this.listService.load();
      this.listService.items.subscribe(
        (lists: List[]) => {
          Observable.from(lists)
            .filter((list: List) => {
              return list.id === id;
            })
            .subscribe((list: List) => {
              this.list = list;
            });
        },
        e => this.errorService.handleError(e),
      );
    }
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.titleField.nativeElement.focus());
  }

  save() {
    let observable: Observable<List>;
    if (!this.list.id) {
      observable = this.listService.add(this.list);
    } else {
      observable = this.listService.update(this.list);
    }

    observable.subscribe(
      () => {
        this.router.navigate(['/list/list']);
      },
      e => this.errorService.handleError(e),
    );
  }
}
