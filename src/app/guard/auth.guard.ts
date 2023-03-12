import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentuserdataService } from '../services/currentuserdata.service';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( public router: Router,private currentUserdataService: CurrentuserdataService,private location: Location) {}
  canActivate() {
    if (!this.currentUserdataService.isAuthenticated()) {

      this.router.navigate(['/auth/signin'],{queryParams:{redirct: this.location.path()}});
      this.currentUserdataService.destory();
      return false;
    }
    return true;
  }
}
