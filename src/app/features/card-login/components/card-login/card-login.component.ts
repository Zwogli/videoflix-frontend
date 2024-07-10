import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.scss'],
})
export class CardLoginComponent {
  email: string = '';
  password: string = '';

  emailError: boolean = false;
  passwordError: boolean = false;
  saveUserData: boolean = false;

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.email = this.dataSharingService.getEmail(); // Get the email-address from service
  }

  login() {
    this.resetErrors();
    this.validateForm();
    if (this.isValidateForm()) {
      if (this.saveUserData) {
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      }
      const authenticationUser = {
        email: this.email,
        password: this.password,
      };
      console.log(
        'Test login: ',
        authenticationUser,
        'checkbox state: ',
        this.saveUserData
      );
    } else {
      console.error('Login failed form incorrect');
    }
  }

  resetErrors(): void {
    this.emailError = false;
    this.passwordError = false;
  }

  validateForm(): void {
    if (!this.isValidEmail(this.email)) {
      this.emailError = true;
    }

    if (!this.isValidPassword(this.password)) {
      this.passwordError = true;
    }
  }

  isValidateForm() {
    return !this.emailError && !this.passwordError;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  toogleCheckbox() {
    if (this.saveUserData) {
      console.log('Checkbox state true ');
    } else {
      console.log('Checkbox state false');
    }
  }
}
