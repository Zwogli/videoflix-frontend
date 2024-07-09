import { Component } from '@angular/core';

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

  onSubmit(): void {
    this.resetErrors();
    this.validateForm();

    if (this.isValidForm()) {
      // Form is valid, proceed with the registration process
      console.log('Form is valid, proceed with registration');
    }
  }

  validateForm(): void {
    if (!this.isValidEmail(this.email)) {
      this.emailError = true;
    }

    if (!this.isVAlidUserName(this.userName)) {
      this.userNameError = true;
    }

    if (!this.isValidPassword(this.password)) {
      this.passwordError = true;
    }

    if (!this.isComplexPassword(this.password)) {
      this.passwordComplexityError = true;
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = true;
    }
  }

  resetErrors(): void {
    this.emailError = false;
    this.userNameError = false;
    this.passwordError = false;
    this.passwordComplexityError = false;
    this.confirmPasswordError = false;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isVAlidUserName(userName: string): boolean {
    return userName.length >= 2;
  }

  isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  isComplexPassword(password: string): boolean {
    const complexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return complexityPattern.test(password);
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
