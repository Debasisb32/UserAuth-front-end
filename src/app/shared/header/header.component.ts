import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentuserdataService } from 'src/app/services/currentuserdata.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authorized: boolean = false;
  currentUser: any;
  srcImage: any;
  date: Date;
  private onDestroyUnSubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private currentuserdata: CurrentuserdataService,
  ) {
    this.authService.getLoggedUser.subscribe(val =>this.refreshHeader(val))
  }
  private refreshHeader(currentUser1): void {
    if(currentUser1!==undefined){
      this.authorized = true;
      this.currentUser = currentUser1.user;
    }
  }
  ngOnInit(): void {
    this.date = new Date();
    this.currentUser = this.currentuserdata.get_current_user();
  }
  signOut() {
    let token = this.currentuserdata.get_user_reftoken();
    this.authService.signout(token)
      .pipe(takeUntil(this.onDestroyUnSubscribe))
      .subscribe(
        result => {

            this.currentuserdata.destory();
            this.authorized = false;
            this.currentUser = null;
            this.router.navigate([`/auth/signin`])
            .then(() => {
              window.location.reload();
            });
        },
        error => {
        }
      );
  }

}
