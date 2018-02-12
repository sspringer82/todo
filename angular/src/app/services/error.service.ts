import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorService {
  constructor(private router: Router) {}

  handleError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.router.navigate(['/login']);
    } else {
      confirm(err.message);
    }
  }
}
