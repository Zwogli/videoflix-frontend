import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class CsrfTokenService {
  private baseUrl: string = environment.baseUrl;
  private csrfTokenKey = 'csrftoken';

  constructor(private http: HttpClient, private httpService: HttpService) {}

  getCsrfToken(): Observable<string> {
    const csrfToken = this.getTokenFromStorage();
    const url = 'http://127.0.0.1:8000/auth/get-csrf-token/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get<{ csrfToken: string }>(url, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        map((response) => response.csrfToken),
        tap((csrfToken) => {
          if (csrfToken) {
            this.storeToken(csrfToken);
            console.log('CSRF Token gespeichert im sessionStorage:', csrfToken);
          } else {
            this.removeToken(); // Token entfernen, falls leer
          }
        }),
        catchError((error) => {
          console.error('Fehler beim Abrufen des CSRF-Tokens:', error);
          return of(''); // Rückgabe eines leeren Strings im Fehlerfall
        })
      );
  }

  private getTokenFromStorage(): string | null {
    return sessionStorage.getItem(this.csrfTokenKey);
  }

  private storeToken(token: string): void {
    sessionStorage.setItem(this.csrfTokenKey, token);
  }

  private removeToken(): void {
    sessionStorage.removeItem(this.csrfTokenKey);
  }
}
