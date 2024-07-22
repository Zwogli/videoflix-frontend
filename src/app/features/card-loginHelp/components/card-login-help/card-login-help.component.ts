import { Component } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';

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
    private httpService: HttpService
  ) {}

  sendMail() {
    if (this.validService.isValidEmail(this.email)) {
      this.emailError = false;
      console.log('Email confirmed');
      // todo send mail
      this.httpService.post('auth/send-reset-email/', this.email).subscribe({
        next: (response) => {
          console.log('E-Mail zum Zurücksetzen des Passworts gesendet:', response);
          // Hier kannst du eine Erfolgsmeldung anzeigen oder den Benutzer weiterleiten
        },
        error: (error) => {
          console.error('Fehler beim Senden der E-Mail zum Zurücksetzen des Passworts:', error);
          this.emailError = true;
          // Hier kannst du eine Fehlermeldung anzeigen
        }
      });
    } else {
      this.emailError = true;
    }
  }
}
