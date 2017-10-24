import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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

  login() {
    this.loginService
      .doLogin(this.user.username, this.user.password)
      .subscribe(() => {
        this.router.navigate(['/list']);
      });
  }
}
