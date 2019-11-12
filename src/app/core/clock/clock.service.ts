import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {AudioContextService} from '../audio-context.service';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private worker = new Worker('./clock.worker');
  private lookahead = 25.0;
  private tickSubject = new ReplaySubject<any>(1);
  public tick$ = this.tickSubject.asObservable();

  constructor(private audioContext: AudioContextService) {
    this.worker.onmessage = e => {
      if (e.data === 'tick') {
        this.tickSubject.next();
      } else {
        console.log('message: ' + e.data);
      }
    };
    this.worker.postMessage({interval: this.lookahead});
  }

  start() {
    this.worker.postMessage('start');
  }

  stop() {
    this.worker.postMessage('stop');
  }
}
