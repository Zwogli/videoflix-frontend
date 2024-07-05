import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.scss'],
})
export class CardLoginComponent {
  email: string = '';

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.email = this.dataSharingService.getEmail(); // Get the email-address from service
  }
}
