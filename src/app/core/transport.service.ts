import {Injectable} from '@angular/core';
import {AudioContextService} from './audio-context.service';
import {Event} from './models/event';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private currentTime = 0;
  private tempo = 120;

  constructor(private audioContext: AudioContextService) {
  }

  getCurrentTime(): number {
    return this.audioContext.getCurrentTime() - this.currentTime;
  }

  start() {
    this.currentTime = this.audioContext.getCurrentTime();
  }

  stop() {
    this.currentTime = 0;
  }

  schedule(event: Event, callback: (event: Event) => void) {
    const now = this.audioContext.getCurrentTime();
    const secondsPerBeat = 60 / this.tempo;
    const newEvent = new Event(
      event.note,
      now + event.startTime
    );
    newEvent.stopTime = now + event.stopTime * secondsPerBeat;
    callback(newEvent);
  }
}
