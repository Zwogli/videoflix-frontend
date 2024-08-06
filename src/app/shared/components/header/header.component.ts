import { Component } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  listExcludedRoutes: Array<string> = ['/login', '/home'];
  dropdownOpen = false;

  constructor(private router: Router, private authService: AuthService) {}

  isInvisibleLoginBtn(): boolean {
    const currentRoute = this.router.routerState.snapshot.url;
    const excludedRoutes = this.listExcludedRoutes;

    return !excludedRoutes.includes(currentRoute);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
