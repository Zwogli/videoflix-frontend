import { Component } from '@angular/core';
import { ValidationService } from 'src/app/shared/validation/validation.service';

@Component({
  selector: 'app-card-login-help',
  templateUrl: './card-login-help.component.html',
  styleUrls: ['./card-login-help.component.scss'],
})
export class CardLoginHelpComponent {
  email: string = '';

  emailError: boolean = false;

  constructor(private validService: ValidationService) {}

  sendMail() {
    if (this.validService.isValidEmail(this.email)) {
      this.emailError = false;
      console.log('Email confirmed');
      // todo send mail
    } else {
      this.emailError = true;
    }
  }
}
