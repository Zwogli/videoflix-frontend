import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CsrfTokenService } from './shared/services/csrf-token/csrf-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'videoflix-frontend';
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private csrfTokenService: CsrfTokenService
  ) {}

  ngOnInit() {
    // this.loadCsrfToken();
    this.csrfTokenService.getCsrfToken().subscribe(csrfToken => {
      // Der CSRF-Token wird als Cookie gesetzt, falls dies erforderlich ist
      console.log('CSRF Token:', csrfToken);
    });
  }

  // private loadCsrfToken() {
  //   const csrfToken = this.csrfTokenService.getToken();
  //   if (!csrfToken) {
  //     this.http
  //       .get(`${this.baseUrl}/auth/get-csrf-token/`, { responseType: 'text' })
  //       .subscribe({
  //         next: (token) => {
  //           this.csrfTokenService.setToken(token);
  //         },
  //         error: (error) => {
  //           console.error('Error loading CSRF token:', error);
  //         },
  //       });
  //   }
  // }
}
