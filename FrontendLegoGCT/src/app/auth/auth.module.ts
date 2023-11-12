import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    CookieService
  ]
})
export class AuthModule { }
