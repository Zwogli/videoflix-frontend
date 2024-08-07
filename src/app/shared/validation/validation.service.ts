import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  isValidEmail(email: string): boolean {
    // Simple regex for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isEmptyEmail(email: string) {
    return email === '';
  }

  isValidUserName(userName: string): boolean {
    return userName.length >= 2;
  }

  isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  isComplexPassword(password: string): boolean {
    const complexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return complexityPattern.test(password);
  }
}
