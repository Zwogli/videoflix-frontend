import { Component } from '@angular/core';
import { BreakpointObserverService } from '../../../../core/services/breakpoint-observer/breakpoint-observer.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  isXSmall$!: Observable<boolean>;
  isXLarge$!: Observable<boolean>;

  constructor(
    private breakpointObserverService: BreakpointObserverService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const message = params['message'];
      if (message) {
        this.notificationService.showDialog(message);
      }
    });
    this.isXSmall$ = this.breakpointObserverService.isXSmall();
    this.isXLarge$ = this.breakpointObserverService.isXLarge();
  }
}
