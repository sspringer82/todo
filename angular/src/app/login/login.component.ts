import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('username') private usernameField: ElementRef;
  // @todo add type user
  public user: {
    username: string;
    password: string;
  };

  constructor(private loginService: LoginService, private router: Router) {
    this.user = {
      username: '',
      password: '',
    };
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.usernameField.nativeElement.focus());
  }

  login() {
    this.loginService
      .doLogin(this.user.username, this.user.password)
      .subscribe(() => {
        this.router.navigate(['/list']);
      });
  }
}
