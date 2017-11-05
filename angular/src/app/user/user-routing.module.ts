import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { AdminAuthGuard } from '../shared/services/admin-auth-guard.service';

const listRoutes: Routes = [
  {
    path: 'user',
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'form',
        component: FormComponent,
      },

      {
        path: 'edit/:id',
        component: FormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(listRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
