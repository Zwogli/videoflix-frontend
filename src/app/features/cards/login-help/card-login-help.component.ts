import { Component } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-card-login-help',
  templateUrl: './card-login-help.component.html',
  styleUrls: ['./card-login-help.component.scss'],
})
export class CardLoginHelpComponent {
  email: string = '';
  emailError: boolean = false;
  loading: boolean = false;

  constructor(
    private validService: ValidationService,
    private httpService: HttpService
  ) {}

  submitSendMail() {
    if (this.validService.isValidEmail(this.email)) {
      this.emailError = false;
      this.loading = true;
      this.postMail();
    } else {
      this.emailError = true;
    }
  }

  postMail() {
    this.httpService
      .post('auth/send-reset-email/', { email: this.email })
      .subscribe({
        next: (response: any) => {
          console.log(
            'E-Mail zum Zurücksetzen des Passworts gesendet:',
            response
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Fehler beim Senden der E-Mail:', error);
          this.emailError = true;
          this.loading = false;
        },
        complete: () => {
          console.log('POST-Anfrage zum Senden der E-Mail abgeschlossen.');
          this.loading = false;
        },
      });
  }
}
