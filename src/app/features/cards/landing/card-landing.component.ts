import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { ValidationService } from 'src/app/shared/validation/validation.service';

@Component({
  selector: 'app-card-landing',
  templateUrl: './card-landing.component.html',
  styleUrls: ['./card-landing.component.scss'],
})
export class CardLandingComponent {
  email: string = ''; // Variable for the e-mail address
  emailError: boolean = false; // Variable to track email error state

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService,
    private validService: ValidationService
  ) {}

  navigateToLogin(): void {
    if (this.isValidForm()) {
      this.dataSharingService.setEmail(this.email); // Set the e-mail address in the service
      this.router.navigate(['/login']); // Navigate to login-page
    } else {
      this.emailError = true;
    }
  }

  isValidForm() {
    return (
      this.validService.isValidEmail(this.email) ||
      this.validService.isEmptyEmail(this.email)
    );
  }
}
