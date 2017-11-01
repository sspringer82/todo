import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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

  private initialCredentials = {
    username: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {
    this.user = { ...this.initialCredentials };
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.usernameField.nativeElement.focus());
  }

  login() {
    this.loginService.doLogin(this.user.username, this.user.password).subscribe(
      () => {
        this.router.navigate(['/todo/list']);
      },
      (err: HttpErrorResponse) => {
        // @todo show error msg
        this.user = {
          ...this.initialCredentials,
        };
      },
    );
  }
}
