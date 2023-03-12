import { Injectable } from '@angular/core';

import { Observable, of, from, throwError } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private messageService: MessageService) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (httperror: any): Observable<T> => {

      return throwError(httperror.error);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AOTService: ${message}`);
  }
}
