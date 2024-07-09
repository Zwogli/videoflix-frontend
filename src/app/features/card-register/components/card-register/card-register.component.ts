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
      const authenticationUser = this.createFormObject();
      console.log(
        'Form is valid, proceed with registration',
        authenticationUser
      );
      // Hier kannst du deinen Service aufrufen, um die Daten an das Backend zu senden
      // this.authService.register(authenticationUser).subscribe(response => {
      //   console.log('Registration successful', response);
      // }, error => {
      //   console.error('Registration failed', error);
      // });
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

  createFormObject() {
    return {
      email: this.email,
      userName: this.userName,
      password: this.password,
    };
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
