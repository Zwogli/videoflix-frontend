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
  confirmPassword: string = '';
  validPassword: boolean = false;
  validCofirmedPassword: boolean = false;
  passwordsMatch: boolean = false;
  passwordErrorLength: boolean = false;
  passwordErrorComplex: boolean = false;

  constructor(
    private validService: ValidationService,
    private httpService: HttpService
  ) {}

  confirmPasswordMatch() {
    if (this.isPasswordMatch()) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }

  isPasswordMatch() {
    return this.password === this.confirmPassword;
  }

  checkPassword() {
    if (!this.validService.isValidPassword(this.password)) {
      console.log('Passwortlänge: ', this.passwordErrorLength);

      this.passwordErrorLength = true;
    } else {
      this.passwordErrorLength = false;
    }
    if (!this.validService.isComplexPassword(this.password)) {
      this.passwordErrorComplex = true;
    } else {
      this.passwordErrorComplex = false;
    }
  }

  isPasswordMinLength() {
    return this.password.length && this.confirmPassword.length == 6;
  }

  submitChangePassword(): void {
    // Hier können Sie Ihre Logik zum Ändern des Passworts hinzufügen
    console.log('Passwörter stimmen überein. Passwort ändern.');
  }
}
