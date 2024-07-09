import { Component } from '@angular/core';

@Component({
  selector: 'app-card-login-help',
  templateUrl: './card-login-help.component.html',
  styleUrls: ['./card-login-help.component.scss'],
})
export class CardLoginHelpComponent {
  email: string = '';

  emailError: boolean = false;

  sendMail() {
    if (this.isValidEmail(this.email)) {
      this.emailError = false;
      console.log('Email confirmed');
      // todo send mail
    } else {
      this.emailError = true;
    }
  }

  isValidEmail(email: string): boolean {
    // Simple regex for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
