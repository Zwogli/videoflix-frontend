import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`, // Authorization Header mit Token
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Leitet zur Startseite (oder Login-Seite) um, wenn nicht authentifiziert
          this.router.navigate(['']);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
