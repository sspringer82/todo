import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ListService } from './services/list.service';
import { ListRoutingModule } from './list-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [ListRoutingModule, HttpClientModule, BrowserAnimationsModule],
  providers: [ListService],
})
export class ListModule {}
