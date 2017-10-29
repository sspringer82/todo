import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { TodoService } from './services/todo.service';
import { FormComponent } from './form/form.component';
import { TodoRoutingModule } from './todo-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatSlideToggleModule,
} from '@angular/material';

@NgModule({
  declarations: [ListComponent, ListItemComponent, FormComponent],
  imports: [
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  providers: [TodoService],
})
export class TodoModule {}
