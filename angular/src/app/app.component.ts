import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './services/login.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isNavHidden = false;
  public isAdmin = false;
  constructor(private router: Router, private loginService: LoginService) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.router.routerState.snapshot)
      .subscribe(event => {
        this.isNavHidden = event.url === '/login';

        if (!this.isNavHidden) {
          const user = this.loginService.getUser();
          this.isAdmin = !!(user && user.isAdmin);
        }
      });
  }
}
