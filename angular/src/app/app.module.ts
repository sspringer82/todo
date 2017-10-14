import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { TodoService } from './services/todo.service';
import { FormComponent } from './form/form.component';
import { routerModule } from './app.router';

@NgModule({
  declarations: [AppComponent, ListComponent, ListItemComponent, FormComponent],
  imports: [BrowserModule, routerModule, FormsModule],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
