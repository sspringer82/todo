import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'todo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public register = {
    id: 0,
    username: '',
    password: '',
    confirmPassword: '',
    isActive: 0,
    isAdmin: 0,
    created: 0,
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  save() {
    if (
      this.register.password.length > 0 &&
      this.register.password === this.register.confirmPassword
    ) {
      const user = { ...this.register };
      delete user.confirmPassword;
      const observable = this.userService.register(user);

      observable.subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }
}
