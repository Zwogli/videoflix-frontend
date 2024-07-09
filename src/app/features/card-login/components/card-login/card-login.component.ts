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

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.email = this.dataSharingService.getEmail(); // Get the email-address from service
  }

  login() {
    this.resetErrors();
    if (!this.isValidEmail(this.email)) {
      this.emailError = true;
    }

    if (!this.isValidPassword(this.password)) {
      this.passwordError = true;
    }
  }

  resetErrors(): void {
    this.emailError = false;
    this.passwordError = false;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isValidPassword(password: string): boolean {
    return password.length >= 6;
  }
}
