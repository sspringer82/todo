import { Injectable } from '@angular/core';

import { LoginService } from '../../services/login.service';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService extends BaseService<User> {
  protected baseUrl = '/user';

  constructor(
    protected http: HttpClient,
    protected loginService: LoginService,
  ) {
    super(http, loginService);
  }
}
