import { Component } from '@angular/core';
import { BreakpointObserverService } from '../../../../core/breakpoint-observer/breakpoint-observer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  isXSmall$!: Observable<boolean>;
  isXLarge$!: Observable<boolean>;

  constructor(private breakpointObserverService: BreakpointObserverService) {}

  ngOnInit(): void {
    this.isXSmall$ = this.breakpointObserverService.isXSmall();
    this.isXLarge$ = this.breakpointObserverService.isXLarge();
    console.log('isXSmall$', this.isXSmall$);
  }
}
