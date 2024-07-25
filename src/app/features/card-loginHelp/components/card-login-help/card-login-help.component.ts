import { Component } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { CsrfTokenService } from 'src/app/shared/services/csrf-token/csrf-token.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-card-login-help',
  templateUrl: './card-login-help.component.html',
  styleUrls: ['./card-login-help.component.scss'],
})
export class CardLoginHelpComponent {
  email: string = '';
  emailError: boolean = false;

  constructor(
    private validService: ValidationService,
    private httpService: HttpService,
    private csrfTokenService: CsrfTokenService
  ) {}

  submitSendMail() {
    if (this.validService.isValidEmail(this.email)) {
      this.emailError = false;
      this.getCsrfToken();
    } else {
      this.emailError = true;
    }
  }


  getCsrfToken() {
    this.httpService.get('auth/get-csrf-token/').subscribe({
      next: (response: any) => {
        const csrfToken = response.csrfToken;
        if (csrfToken) {
          this.csrfTokenService.storeToken(csrfToken);
          this.postMail();
        }
      },
      error: (error) => {
        console.error('Fehler beim Abrufen des CSRF-Tokens:', error);
        this.emailError = true;
      }}
    );
  }

  postMail() {
    this.httpService.post('auth/send-reset-email/', { email: this.email });
  }
}
