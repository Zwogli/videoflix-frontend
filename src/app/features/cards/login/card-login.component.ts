import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  loading: boolean = false;

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService,
    private validService: ValidationService,
    private httpService: HttpService,
    private snackBar: MatSnackBar
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

  submitLogin() {
    this.loading = true;
    this.resetErrors();
    this.validateForm();
    if (this.isValidateForm()) {
      this.manageSaveUserData();
      const authenticationUser = this.createAuthenticationUser();

      this.login(authenticationUser);
    } else {
      console.error('Login failed form incorrect');
    }
  }

  login(authenticationUser: { email: string; password: string }) {
    this.httpService.post<User>('auth/login', authenticationUser).subscribe({
      next: (data) => {
        console.log('Benutzer eingeloggt:', data);
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Fehler beim einloggen:', error.message);
        this.loading = false;
        this.showErrorSnackbar(this.messageError());
      },
    });
  }

  messageError() {
    return 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.';
  }

  showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
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
