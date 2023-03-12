import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {  BehaviorSubject,Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CurrentuserdataService } from '../services/currentuserdata.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isRefreshing = false;
  token: string;
  omitCalls = [''];
  skipInterceptor = true;
  constructor(private router: Router, private authService: AuthService, private currentUserdataService: CurrentuserdataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.omitCalls.forEach(api => {
      if (req.url.includes(api)) {
        this.skipInterceptor = false;
      }else{
        this.skipInterceptor = true;
      }
    });
    this.skipInterceptor = true;

    this.token = this.currentUserdataService.get_user_token();
    console.log(this.token)

    if (this.token && this.skipInterceptor) {
      console.log('add token')
      req =this.addTokenHeader(req,this.token);
      console.log(req)
      return next.handle(req).pipe(catchError(error =>{
        if (error instanceof HttpErrorResponse &&  error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(error);
      }));

    }
    return next.handle(req);
}
private addTokenHeader(request: HttpRequest<any>, token: string) {
return request.clone({ headers: request.headers.set('authorization', 'Bearer ' + token) });
}


private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);
    const reftoken = this.currentUserdataService.get_user_reftoken();
    if (reftoken){
      return this.authService.refreshToken(reftoken).pipe(
        switchMap((result: any) => {
          this.token =result['result']['tokens']['accessToken'];
          this.isRefreshing = false;
          this.currentUserdataService.savetoken(result['result']);
          this.refreshTokenSubject.next(result['result']['tokens']['accessToken']);
          return next.handle(this.addTokenHeader(request, result['result']['tokens']['accessToken']));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.signout(this.token);
          return throwError(err);
        })
      );
    }
  }
  return this.refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap((token) => next.handle(this.addTokenHeader(request, token)))
  );
}
}
