import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private loginService: LoginService;

  constructor(private inj: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.loginService) {
      this.loginService = this.inj.get(LoginService);
    }
    return next.handle(
      request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.loginService.getToken()}`,
        },
      }),
    );
  }
}
