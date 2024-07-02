import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  isXSmall(): Observable<boolean> {
    return this.breakpointObserver.observe([Breakpoints.XSmall])
      .pipe(
        map(result => result.matches)
      );
  }

  isXLarge(): Observable<boolean> {
    return this.breakpointObserver.observe([Breakpoints.XLarge])
      .pipe(
        map(result => result.matches)
      );
  }
}
