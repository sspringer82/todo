import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('username') private usernameField: ElementRef;

  public user = new User();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (!isNaN(id)) {
      this.userService.load();
      this.userService.items.subscribe(
        (users: User[]) => {
          Observable.from(users)
            .filter((user: User) => {
              return user.id === id;
            })
            .subscribe((user: User) => {
              this.user = user;
            });
        },
        e => this.errorService.handleError(e),
      );
    }
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.usernameField.nativeElement.focus());
  }

  save() {
    this.user.isActive = parseInt(this.user.isActive + '', 10);
    this.user.isAdmin = parseInt(this.user.isAdmin + '', 10);
    let observable: Observable<User>;
    if (!this.user.id) {
      observable = this.userService.add(this.user);
    } else {
      observable = this.userService.update(this.user);
    }

    observable.subscribe(
      () => {
        this.router.navigate(['/user/list']);
      },
      e => this.errorService.handleError(e),
    );
  }
}
