import { Component } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';

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

  constructor(private validService: ValidationService) {}

  onSubmit(): void {
    this.resetErrors();
    this.validateForm();

    if (this.isValidForm()) {
      const authenticationUser = this.createUser();
      console.log(
        'Form is valid, proceed with registration',
        authenticationUser
      );
      // todo backend-connection
      /* 
      Hier kannst du deinen Service aufrufen, um die Daten an das Backend zu senden
      this.authService.register(authenticationUser).subscribe(response => {
        console.log('Registration successful', response);
      }, error => {
        console.error('Registration failed', error);
      }); 
      */
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
      userName: this.userName,
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
