import { Component } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  password: string = '';
  passwordRepeat: string = '';
  passwordsMatch: boolean = false;

  constructor(
    private validService: ValidationService,
    private httpService: HttpService
  ) {}

  checkPasswords(): void {
    this.passwordsMatch = this.password === this.passwordRepeat;
  }

  submitChangePassword(): void {
    if (this.passwordsMatch) {
      // Hier können Sie Ihre Logik zum Ändern des Passworts hinzufügen
      console.log('Passwörter stimmen überein. Passwort ändern.');
    }
  }
}
