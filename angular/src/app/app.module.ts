import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';

import { TodoModule } from './todo';
import { ListModule } from './list';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatListModule,
} from '@angular/material';
import { UserModule } from './user/user.module';
import { AdminAuthGuard } from './shared/services/admin-auth-guard.service';
import { ConfigService } from './services/config.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/http.interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    TodoModule,
    ListModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [
    LoginService,
    AdminAuthGuard,
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
