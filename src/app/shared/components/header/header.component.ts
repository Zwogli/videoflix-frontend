import { Component } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  listExcludedRoutes: Array<string> = ['/login'];

  constructor(private router: Router) {}

  isInvisibleLoginBtn(): boolean {
    const currentRoute = this.router.routerState.snapshot.url;
    const excludedRoutes = this.listExcludedRoutes;

    return !excludedRoutes.includes(currentRoute);
  }
}
