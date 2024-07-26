import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';

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

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService,
    private validService: ValidationService
  ) {}

  ngOnInit(): void {
    this.email = this.dataSharingService.getEmail(); // Get the email-address from service
    this.loadUserData();
  }

  loadUserData(): void {
    const savedEmail: string | null = localStorage.getItem('email');
    const savedPassword: string | null = localStorage.getItem('password');
    const savedSaveUserData = localStorage.getItem('saveUserData');

    // Nullish Coalescing Operator (??), Ternary Operators (condition ? valueIfTrue : valueIfFalse)
    this.email = savedEmail !== null ? savedEmail : this.email;
    this.password = savedPassword !== null ? savedPassword : this.password;
    this.saveUserData = savedSaveUserData === 'true';
  }

  login() {
    this.resetErrors();
    this.validateForm();
    if (this.isValidateForm()) {
      this.manageSaveUserData();
      const authenticationUser = this.createAuthenticationUser();
      console.log(
        'Test login: ',
        authenticationUser,
        'checkbox state: ',
        this.saveUserData
      );
      // todo backend-connection
      this.router.navigate(['/home']);
    } else {
      console.error('Login failed form incorrect');
    }
  }

  resetErrors(): void {
    this.emailError = false;
    this.passwordError = false;
  }

  validateForm(): void {
    if (!this.validService.isValidEmail(this.email)) {
      this.emailError = true;
    }

    if (!this.validService.isValidPassword(this.password)) {
      this.passwordError = true;
    }
  }

  isValidateForm() {
    return !this.emailError && !this.passwordError;
  }

  manageSaveUserData() {
    if (this.saveUserData) {
      this.setLocalStorage();
    } else {
      this.removeLocalStorage();
    }
  }

  setLocalStorage() {
    localStorage.setItem('email', this.email);
    localStorage.setItem('password', this.password);
    localStorage.setItem('saveUserData', String(this.saveUserData));
  }

  removeLocalStorage() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('saveUserData');
  }

  createAuthenticationUser() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
