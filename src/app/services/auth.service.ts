import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HandleErrorService } from './handle-error.service';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',

  })
};
const accessTokenHttpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedUser: EventEmitter<any> = new EventEmitter()

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private router: Router
  ) { }
  //  Signin
  signin(userData: any) {
    const apiUrl = `${environment.SERVER_URL}auth/login`;
    return this.http.post(apiUrl, userData, httpOptions)
      .pipe(
        map(response => response),
        tap(val => this.getLoggedUser.emit(val)),
        catchError(this.handleErrorService.handleError('signin'))
      );
  }
  signUp(userData: any) {
    const apiUrl = `${environment.SERVER_URL}/auth/register`;
    return this.http.post(apiUrl, userData, httpOptions)
      .pipe(
        map(response => response),
        tap(val => this.getLoggedUser.emit(val)),
        catchError(this.handleErrorService.handleError('signUp'))
      );
  }

  //  Signout
  signout(token: string) {
    const apiUrl = `${environment.SERVER_URL}auth/logout`;
    const loggedInUserdata = {
      refreshToken: token
    };
    return this.http.post(apiUrl, loggedInUserdata, httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleErrorService.handleError('signout'))
      );
  }
  // Refresh Token
  refreshToken(token: string) {
    const loggedInUserdata = {
      refreshToken: token
    };
    const apiUrl = `${environment.SERVER_URL}auth/refreshToken`;
    return this.http.post(apiUrl, loggedInUserdata, httpOptions)
  }
  // Refresh Token
  verifyEmail(token: string) {

    const apiUrl = `${environment.SERVER_URL}auth/verify-email/${token}`;
    return this.http.get(apiUrl, httpOptions)
  }
}
