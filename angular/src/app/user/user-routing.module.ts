import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { AdminAuthGuard } from '../shared/services/admin-auth-guard.service';
import { RegisterComponent } from './components/register/register.component';

const listRoutes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'list',
        component: ListComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'form',
        component: FormComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'edit/:id',
        component: FormComponent,
        canActivate: [AdminAuthGuard],
      },

      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(listRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
