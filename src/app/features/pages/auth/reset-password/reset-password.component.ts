import { Component } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
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
    this.checkPasswordLength();
    this.checkPasswordComplex();
  }

  checkPasswordLength() {
    if (!this.validService.isValidPassword(this.password)) {
      this.passwordErrorLength = true;
    } else {
      this.passwordErrorLength = false;
    }
  }

  checkPasswordComplex() {
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
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('user_id');
      const token = params.get('token');

      this.httpService
        .put(`auth/reset-password/${userId}/${token}/`, {
          password: this.password,
        })
        .subscribe({
          next: (response: any) => {
            console.log('Passwort erfolgreich geändert.', response);
            // todo Eventuell eine Snackbar oder eine Umleitung zum Login hier
          },
          error: (error) => {
            console.error('Fehler beim Ändern des Passworts:', error);
            // todo Eventuell eine Fehlermeldung anzeigen
          },
        });
    });
  }
}
