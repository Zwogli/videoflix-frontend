import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isVAlidUserName(userName: string): boolean {
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
