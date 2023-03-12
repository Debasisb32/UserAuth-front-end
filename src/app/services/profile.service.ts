import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HandleErrorService } from './handle-error.service';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CurrentuserdataService } from './currentuserdata.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  @Output() getLoggedUser: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
  ) { }
    reSendEmail(){
      const apiUrl = `${environment.SERVER_URL}auth/send-verification-email`;
      return this.http.get(apiUrl, httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleErrorService.handleError('reSendEmail'))
      );
    }
}
