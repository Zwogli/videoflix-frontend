import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CsrfTokenService {
  private csrfTokenKey = 'csrftoken';
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCsrfToken(): Observable<string> {
    const url = `${this.baseUrl}/auth/get-csrf-token/`;

    return this.http.get<{ csrfToken: string }>(url, { withCredentials: true }).pipe(
      map(response => {
        const token = response.csrfToken;
        if (token) {
          this.storeToken(token); // Falls Sie den Token im Speicher halten wollen
        }
        console.log('Test token:', token);
        return token;
      }),
      catchError(error => {
        console.error('Fehler beim Abrufen des CSRF-Tokens:', error);
        return of(''); // Geben Sie einen leeren String zurück, wenn ein Fehler auftritt
      })
    );
  }

  private getTokenFromStorage(): string | null {
    return sessionStorage.getItem(this.csrfTokenKey);
  }

  private storeToken(token: string): void {
    sessionStorage.setItem(this.csrfTokenKey, token);
  }
}
