import {Injectable} from '@angular/core';
import {AudioContextService} from './audio-context.service';
import {Event} from './models/event';
import {Key} from './models/key';
import {Part} from './models/part';
import {Subject} from 'rxjs';
import {take} from 'rxjs/operators';

export enum SequencerStates {
  IDLE,
  RECORDING,
  PLAYING,
  WAITING
}

@Injectable({
  providedIn: 'root'
})
export class SequencerService {
  public activeSong: Part;
  private state: SequencerStates = SequencerStates.IDLE;
  private tempo = 60;
  private stopSubject = new Subject<Key>();
  private stop$ = this.stopSubject.asObservable();

  constructor(private audioContextService: AudioContextService) {

  }

  noteOn(key: Key) {
    const event = new Event(key, this.audioContextService.getCurrentTime() - this.activeSong.startTime);
    this.scheduleNote(event);
  }

  noteOff(key: Key) {
    this.stopSubject.next(key);
  }

  scheduleNote(event: Event) {
    // schedule note on note off event in order to get note duration
    this.stop$.pipe(take(1)).subscribe(() => {
      event.stopTime = this.audioContextService.getCurrentTime() - this.activeSong.startTime;
      this.activeSong.add(event);
    });
  }

  record() {
    this.setState(SequencerStates.WAITING);
    this.activeSong = new Part(this.audioContextService.getCurrentTime());
  }

  play(fn: any) {
    if (this.getState() === SequencerStates.WAITING) {
      this.setState(SequencerStates.RECORDING);
    } else {
      this.setState(SequencerStates.PLAYING);
      this.activeSong.forEachNote(note => {
        fn(note);
      });
    }
  }

  stop() {
    this.setState(SequencerStates.IDLE);
  }

  getState(): SequencerStates {
    return this.state;
  }

  setState(newState: SequencerStates) {
    this.state = newState;
  }
}
