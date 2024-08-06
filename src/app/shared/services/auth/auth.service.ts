import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.baseUrl}/auth/login/`;

  constructor(private http: HttpClient, private router: Router) {}

  login(authenticationUser: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.authUrl, authenticationUser).pipe(
      tap((response) => {
        console.log('Benutzer eingeloggt:', response);
        // Speichere den Token im sessionStorage
        sessionStorage.setItem('authToken', response.token); 
        this.router.navigate(['/home']);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
