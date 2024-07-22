import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsrfTokenService {
  private tokenKey = 'csrftoken';

  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
