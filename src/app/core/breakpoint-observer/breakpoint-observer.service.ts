import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  isHandset(): Observable<boolean> {
    return this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches)
      );
  }
}
