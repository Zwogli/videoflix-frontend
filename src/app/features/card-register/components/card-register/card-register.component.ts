import { Component } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { HttpService } from 'src/app/shared/services/http/http.service';

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

  constructor(
    private validService: ValidationService,
    private httpService: HttpService
  ) {}

  onSubmit(): void {
    this.resetErrors();
    this.validateForm();

    if (this.isValidForm()) {
      const authenticationUser = this.createUser();

      this.httpService.post<any>('auth/registration/', authenticationUser)
        .subscribe({
          next: (data) => {
            console.log('Benutzer erstellt:', data);
          },
          error: (error) => {
            console.error('Fehler bei der Benutzererstellung:', error.message);
          }
        });
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

  createUser() {
    return {
      email: this.email,
      user_name: this.userName,
      password: this.password,
    };
  }

  isValidForm() {
    return (
      !this.emailError &&
      !this.passwordError &&
      !this.passwordComplexityError &&
      !this.confirmPasswordError
    );
  }
}
