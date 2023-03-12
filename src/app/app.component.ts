import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CurrentuserdataService } from './services/currentuserdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'userauth';
  public currentUser: any;
  constructor(
    private router: Router,
    public currentuserdataService: CurrentuserdataService,
    public authService: AuthService
  ){

  }
  ngOnInit(): void {
    this.currentUser = this.currentuserdataService.get_current_user();
    this.authService.getLoggedUser.subscribe(val =>this.refreshHeader(val))
  }
  private refreshHeader(currentUser): void {
    if(currentUser!==undefined){
      this.currentUser = currentUser;
    }
  }
}
