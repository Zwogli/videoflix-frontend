import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VerificationResponse } from '../../../../models/verificationResponse.model';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent {
  verificationSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('user_id');
      const token = params.get('token');

      if (userId && token) {
        this.verifyEmail(userId, token);
        this.verificationSuccess = true;
      } else {
        this.verificationSuccess = false;
      }
    });
  }

  verifyEmail(userId: string, token: string): void {
    const url = `${environment.baseUrl}/auth/verify/${userId}/${token}/`;
    this.http.get<VerificationResponse>(url).subscribe({
      next: (response) => {
        console.log('Serverantwort:', response);
        if (response.message === 'Your email has been verified.') {
          this.verificationSuccess = true;
        } else {
          this.verificationSuccess = false; // Fehlerfall
        }
      },
      error: (error) => {
        // console.error('Fehler bei der Verifizierung:', error);
        this.verificationSuccess = false;
      },
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
