import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // TODO: Retry when generic strategy?
      catchError((error) => this.handleError(error))
    )
  }

  handleError(error: HttpErrorResponse) {

    // TODO: Display error in alert?
    if (error.error instanceof ErrorEvent) {
      // TODO: Handle js errors
      return EMPTY;
    } else {
      return this.handleServerError(error);
    }

  }

  handleServerError(error: HttpErrorResponse): Observable<any> {
    switch (error.status) {
      case 500:
        return EMPTY;
      case 404:
        // API returns 404 when no data found
        return throwError(() => 'err');
      default:
        return EMPTY;
    }
  }
}