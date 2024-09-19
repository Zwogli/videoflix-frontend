import { Component } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
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
          this.showSnackbar('E-Mail wurde erfolgreich gesendet.', false);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Fehler beim Senden der E-Mail:', error);
          this.emailError = true;
          this.loading = false;
          this.showSnackbar(
            'Fehler beim Senden der E-Mail. Bitte erneut versuchen.',
            true
          );
        },
        complete: () => {
          console.log('POST-Anfrage zum Senden der E-Mail abgeschlossen.');
          this.loading = false;
        },
      });
  }

  showSnackbar(message: string, isError: boolean) {
    this.snackBar.open(message, 'Schließen', {
      duration: 5000,
      panelClass: isError ? 'error-snackbar' : 'success-snackbar',
    });
  }
}
