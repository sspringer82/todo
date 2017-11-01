import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

const todoRoutes: Routes = [
  {
    path: 'todo/list',
    component: ListComponent,
  },
  {
    path: 'todo/form',
    component: FormComponent,
  },

  {
    path: 'todo/edit/:id',
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(todoRoutes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
