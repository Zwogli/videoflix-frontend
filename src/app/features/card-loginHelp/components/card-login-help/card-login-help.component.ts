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
      this.sendMail();
    } else {
      this.emailError = true;
    }
  }

  async sendMail() {
    try {
      const csrfToken = this.createCsrfToken();
      console.log('CSRF Token:', csrfToken);

      const response = this.postMail;
      console.log('E-Mail zum Zurücksetzen des Passworts gesendet:', response);
    } catch (error) {
      console.error(
        'Fehler beim Senden der E-Mail zum Zurücksetzen des Passworts:',
        error
      );
      this.emailError = true;
    }
  }

  async createCsrfToken() {
    try {
      return await firstValueFrom(this.csrfTokenService.getCsrfToken());
    } catch (error) {
      return console.error('Fehler beim erhalten des Csrf-Tokens:', error);
    }
  }

  async postMail(){
    return await firstValueFrom(
      this.httpService.post('auth/send-reset-email/', { email: this.email })
    );
  }
}
