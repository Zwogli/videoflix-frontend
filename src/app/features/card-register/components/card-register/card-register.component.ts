import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ValidationService } from 'src/app/shared/validation/validation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-register',
  templateUrl: './card-register.component.html',
  styleUrls: ['./card-register.component.scss'],
})
export class CardRegisterComponent {
  email: string = '';
  userName: string = '';
  password: string = '';
  confirmPassword: string = '';

  emailError: boolean = false;
  userNameError: boolean = false;
  passwordError: boolean = false;
  passwordComplexityError: boolean = false;
  confirmPasswordError: boolean = false;
  loading: boolean = false;

  constructor(
    private validService: ValidationService,
    private httpService: HttpService,
    private router: Router,

    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.resetErrors();
    this.validateForm();

    if (this.isValidForm()) {
      this.loading = true;
      this.postRegistration();
    }
  }

  resetErrors(): void {
    this.emailError = false;
    this.userNameError = false;
    this.passwordError = false;
    this.passwordComplexityError = false;
    this.confirmPasswordError = false;
  }

  validateForm(): void {
    if (!this.validService.isValidEmail(this.email)) {
      this.emailError = true;
    }

    if (!this.validService.isVAlidUserName(this.userName)) {
      this.userNameError = true;
    }

    if (!this.validService.isValidPassword(this.password)) {
      this.passwordError = true;
    }

    if (!this.validService.isComplexPassword(this.password)) {
      this.passwordComplexityError = true;
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = true;
    }
  }

  isValidForm(): boolean {
    return (
      !this.emailError &&
      !this.passwordError &&
      !this.passwordComplexityError &&
      !this.confirmPasswordError
    );
  }

  postRegistration(): void {
    const authenticationUser = this.createUser();

    this.httpService
      .post<User>('auth/registration/', authenticationUser)
      .subscribe({
        next: (data) => {
          console.log('Benutzer erstellt:', data);
          this.loading = false;
          this.navigateToLoginWithMessage(this.verificationMessage());
        },
        error: (error) => {
          console.error('Fehler bei der Benutzererstellung:', error.message);
          this.loading = false;
          this.shwoErrorSnackbar('Es gab einen Fehler bei der Registrierung.');
        },
      });
  }

  verificationMessage(): string {
    return `Die Registrierung war erfolgreich.<br>
    Eine Verifizierungs Email wurde an dich gesendet.<br>
    Der Login wird erst freigeschalten wenn du deine Email verifizierst.`;
  }

  navigateToLoginWithMessage(messageKey: string): void {
    // Nachricht über URL an Login-Seite senden
    this.router.navigate(['/login'], { queryParams: { message: messageKey } });
  }

  shwoErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  createUser(): User {
    return {
      email: this.email,
      user_name: this.userName,
      password: this.password,
    };
  }
}
