import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private emailSubject = new BehaviorSubject<string>(''); // Initialvalue empty string
  email$ = this.emailSubject.asObservable(); 

  constructor() { }

  setEmail(email: string): void {
    this.emailSubject.next(email);
  }

  getEmail(): string {
    return this.emailSubject.value;
  }
}
