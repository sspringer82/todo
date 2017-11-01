import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatTableModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

import { ListService } from './services/list.service';
import { ListRoutingModule } from './list-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    ListRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [ListService],
})
export class ListModule {}
