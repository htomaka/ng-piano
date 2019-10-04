import {interval, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TickerService {
  private readonly frequency = 25;
  private readonly ticker: Observable<number> = interval(this.frequency);
  private stopSubject = new Subject();
  private stop$ = this.stopSubject.asObservable();

  constructor() {}

  start(): Observable<number> {
    return this.ticker.pipe(
      takeUntil(this.stop$)
    );
  }

  stop() {
    this.stopSubject.next(true);
  }
}
