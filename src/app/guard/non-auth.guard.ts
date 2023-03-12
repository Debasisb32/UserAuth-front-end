import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { CurrentuserdataService } from '../services/currentuserdata.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  constructor( public router: Router,private currentUserdataService: CurrentuserdataService) {}
  canActivate() {
    if (this.currentUserdataService.isAuthenticated()) {
      this.router.navigate(['/user/profile']);
      return false;
    }
    return true;
  }

}
