import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { FormComponent } from './components/form/form.component';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';
import { TodoService } from './services/todo.service';
import { ListModule } from '../list';
import { TodoRoutingModule } from './todo-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  declarations: [
    ListComponent,
    ListItemComponent,
    FormComponent,
    DescriptionDialogComponent,
  ],
  entryComponents: [DescriptionDialogComponent],
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
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    ListModule,
  ],
  providers: [TodoService],
})
export class TodoModule {}
