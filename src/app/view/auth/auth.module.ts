import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    VerifyemailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
