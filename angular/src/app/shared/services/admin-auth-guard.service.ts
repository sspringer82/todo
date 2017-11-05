import { CanActivate } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private loginService: LoginService) {}
  canActivate(): boolean {
    const user = this.loginService.getUser();
    return !!(user && user.isAdmin);
  }
}
