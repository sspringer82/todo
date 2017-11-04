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

@Component({
  selector: 'todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('username') private usernameField: ElementRef;

  public user = new User();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (!isNaN(id)) {
      this.userService.load();
      this.userService.items.subscribe((users: User[]) => {
        Observable.from(users)
          .filter((user: User) => {
            return user.id === id;
          })
          .subscribe((user: User) => {
            this.user = user;
          });
      });
    }
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.usernameField.nativeElement.focus());
  }

  save() {
    let observable: Observable<User>;
    if (!this.user.id) {
      observable = this.userService.add(this.user);
    } else {
      observable = this.userService.update(this.user);
    }

    observable.subscribe(() => {
      this.router.navigate(['/user/list']);
    });
  }
}
