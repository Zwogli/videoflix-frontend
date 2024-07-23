import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CsrfTokenService {
  private tokenKey = 'csrftoken';

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // setToken(token: string): void {
  //   localStorage.setItem(this.tokenKey, token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem(this.tokenKey);
  // }

  getCsrfToken(): Observable<string> {
    return this.http
      .get<{ csrfToken: string }>(`${this.baseUrl}/auth/get-csrf-token/`, {
        withCredentials: true,
      })
      .pipe(map((response) => response.csrfToken));
  }
}
