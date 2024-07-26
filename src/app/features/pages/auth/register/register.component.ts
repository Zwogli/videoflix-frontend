import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserverService } from 'src/app/core/services/breakpoint-observer/breakpoint-observer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isXSmall$!: Observable<boolean>;
  isXLarge$!: Observable<boolean>;

  constructor(private breakpointObserverService: BreakpointObserverService) {}

  ngOnInit(): void {
    this.isXSmall$ = this.breakpointObserverService.isXSmall();
    this.isXLarge$ = this.breakpointObserverService.isXLarge();
  }
}
