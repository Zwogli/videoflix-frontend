import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CsrfTokenService } from './shared/services/csrf-token/csrf-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'videoflix-frontend';

  constructor(private http: HttpClient, private csrfTokenService: CsrfTokenService) {}

  ngOnInit() {
    this.loadCsrfToken();
  }

  private loadCsrfToken() {
    this.http.get('/api/get-csrf-token/', { responseType: 'text' }).subscribe(
      (token: string) => {
        this.csrfTokenService.setToken(token);
      },
      error => {
        console.error('Error loading CSRF token:', error);
      }
    );
  }
}
