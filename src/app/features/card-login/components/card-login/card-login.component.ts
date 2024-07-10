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
    this.loadUserData();
  }

  loadUserData(): void {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedSaveUserData = localStorage.getItem('saveUserData');

    if (savedEmail) {
      this.email = savedEmail;
    }
    if (savedPassword) {
      this.password = savedPassword;
    }
    if (savedSaveUserData) {
      this.saveUserData = savedSaveUserData === 'true';
    }
  }

  login() {
    this.resetErrors();
    this.validateForm();
    if (this.isValidateForm()) {
      if (this.saveUserData) {
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
        localStorage.setItem('saveUserData', String(this.saveUserData));
      }else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('saveUserData');
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
}
