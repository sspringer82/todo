import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

const listRoutes: Routes = [
  {
    path: 'list',
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
export class ListRoutingModule {}
