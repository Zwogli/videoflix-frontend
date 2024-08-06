import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('authToken');

    if (token) {
      return true;
    }

    // Wenn nicht authentifiziert, zur Login-Seite umleiten
    this.router.navigate(['/login']);
    return false;
  }
}
