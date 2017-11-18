import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { RegisterComponent } from './components/register/register.component';
import {
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
} from '@angular/material';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [ListComponent, FormComponent, RegisterComponent],
  imports: [
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [UserService],
})
export class UserModule {}
