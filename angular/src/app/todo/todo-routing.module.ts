import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

const todoRoutes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(todoRoutes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
