import {Injectable} from '@angular/core';
import {AudioContextService} from './audio-context.service';
import {Event} from './models/event';
import {ClockService} from './clock/clock.service';
import {Track} from './models/track';
import {Subject} from 'rxjs';
import {groupBy} from 'lodash';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private tempo = 120;
  private stopSubject = new Subject();
  private stop$ = this.stopSubject.asObservable();

  constructor(private audioContext: AudioContextService, private clock: ClockService) {
    clock.setTempo(this.tempo);
  }

  start() {
    this.clock.start();
  }

  stop() {
    this.clock.stop();
    this.stopSubject.next();
  }

  schedule(track: Track, callback: (event: Event) => void) {
    const eventsByStartTime: { [key: number]: Event[] } = groupBy(track.notes, t => t.startTime);
    this.clock.getTicks()
      .pipe(takeUntil(this.stop$))
      .subscribe(() => {
        const pos = this.clock.getTick();
        if (eventsByStartTime[pos]) {
          eventsByStartTime[pos].forEach(callback);
        }
      });
  }
}
