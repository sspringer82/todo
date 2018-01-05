import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
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
    const token = this.loginService.getToken();
    let auth;
    if (token) {
      auth = {
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return next.handle(request.clone(auth));
  }
}
