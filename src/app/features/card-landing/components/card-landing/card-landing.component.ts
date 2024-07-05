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

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  navigateToLogin(): void {
    this.dataSharingService.setEmail(this.email); // Set the e-mail address in the service
    this.router.navigate(['/login']); // Navigate to login-page
  }
}
