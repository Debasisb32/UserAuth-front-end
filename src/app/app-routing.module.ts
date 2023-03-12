import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NonAuthGuard } from './guard/non-auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/signin',
  },
  {
    path: 'auth',
    loadChildren: () => import('./view/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./view/user/user.module').then(m => m.UserModule),
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
