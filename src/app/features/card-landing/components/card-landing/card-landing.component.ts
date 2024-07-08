import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';

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
    private dataSharingService: DataSharingService
  ) {}

  navigateToLogin(): void {
    if (this.isValidEmail(this.email) || this.isEmptyEmail(this.email)) {
      this.dataSharingService.setEmail(this.email); // Set the e-mail address in the service
      this.router.navigate(['/login']); // Navigate to login-page
    } else {
      this.emailError = true;
    }
  }

  isValidEmail(email: string): boolean {
    // Simple regex for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isEmptyEmail(email: string) {
    return email === '';
  }
}
