import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isNavHidden = false;
  constructor(private router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.router.routerState.snapshot)
      .subscribe(event => {
        this.isNavHidden = event.url === '/login';
      });
  }
}
