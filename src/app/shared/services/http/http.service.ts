import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { CsrfTokenService } from '../csrf-token/csrf-token.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private csrfTokenService: CsrfTokenService
  ) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add other headers if necessary
    });

    // const csrfToken = this.csrfTokenService.getToken();
    const csrfToken = this.getCookie('csrftoken');
    console.log('Show cookie csrfToken: ', csrfToken);
    console.log('Show all Cookies: ', document.cookie);

    if (csrfToken) {
      headers = headers.set('X-CSRFToken', csrfToken);
    }

    return headers;
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, {
      headers: this.getHeaders(),
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders(),
    });
  }
}
