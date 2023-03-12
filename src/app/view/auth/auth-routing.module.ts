import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { NonAuthGuard } from 'src/app/guard/non-auth.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';

const routes: Routes = [
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [ NonAuthGuard ]
  },
  {
    path: "signin",
    component: SigninComponent,
    canActivate: [ NonAuthGuard ]
  },
  {
    path: "verify-email/:token",
    component: VerifyemailComponent,
    canActivate: [ AuthGuard ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
