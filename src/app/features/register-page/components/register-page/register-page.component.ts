import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserverService } from 'src/app/core/services/breakpoint-observer/breakpoint-observer.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  isXSmall$!: Observable<boolean>;
  isXLarge$!: Observable<boolean>;

  constructor(private breakpointObserverService: BreakpointObserverService) {}

  ngOnInit(): void {
    this.isXSmall$ = this.breakpointObserverService.isXSmall();
    this.isXLarge$ = this.breakpointObserverService.isXLarge();
    console.log('isXSmall$', this.isXSmall$);
  }
}
