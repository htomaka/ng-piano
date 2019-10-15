import {Injectable} from '@angular/core';
import {AudioContextService} from './audio-context.service';
import {Event} from './models/event';
import {Key} from './models/key';
import {ReplaySubject, Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {Track} from './models/track';

export enum SequencerStates {
  STOP = 'STOP',
  RECORDING = 'RECORDING',
  PLAYING = 'PLAYING',
  RECORDING_ARMED = 'RECORDING_ARMED',
  SAVING = 'SAVING',
  LOADING = 'LOADING'
}

@Injectable({
  providedIn: 'root'
})
export class SequencerService {
  private state: SequencerStates = SequencerStates.STOP;
  private stopSubject = new Subject<Key>();
  private cancelSubject = new Subject();
  private loadSubject = new ReplaySubject(1);
  private confirmSubject = new Subject<string>();
  private saveSubject = new ReplaySubject<Track>(1);
  private stateSubject = new Subject<SequencerStates>();
  public activeTrack: Track;
  public stop$ = this.stopSubject.asObservable();
  public load$ = this.loadSubject.asObservable();
  public confirm$ = this.confirmSubject.asObservable();
  public save$ = this.saveSubject.asObservable();
  public state$ = this.stateSubject.asObservable();

  constructor(private audioContextService: AudioContextService) {

  }

  noteOn(key: Key) {
    const event = new Event(key, this.audioContextService.getCurrentTime() - this.activeTrack.startTime);
    this.scheduleNote(event);
  }

  noteOff(key: Key) {
    this.stopSubject.next(key);
  }

  scheduleNote(event: Event) {
    // schedule note on note off event in order to get note duration
    this.stop$
      .pipe(
        take(1)
      )
      .subscribe(() => {
        event.stopTime = this.audioContextService.getCurrentTime() - this.activeTrack.startTime;
        this.activeTrack.add(event);
      });
  }

  record() {
    this.setState(SequencerStates.RECORDING_ARMED);
    this.activeTrack = new Track(this.audioContextService.getCurrentTime());
  }

  play(fn: (event: Event) => void) {
    if (this.getState() === SequencerStates.RECORDING_ARMED) {
      this.setState(SequencerStates.RECORDING);
    } else {
      if (!this.activeTrack) {
        return;
      }
      this.setState(SequencerStates.PLAYING);
      this.activeTrack.forEachNote(note => {
        fn(note);
      });
    }
  }

  stop() {
    if (this.getState() === SequencerStates.PLAYING) {
      this.setState(SequencerStates.STOP);
    }

    if (this.getState() === SequencerStates.RECORDING) {
      this.save();
    }

    if (this.getState() === SequencerStates.RECORDING_ARMED) {
      this.setState(SequencerStates.STOP);
    }
  }

  getState(): SequencerStates {
    return this.state;
  }

  setState(newState: SequencerStates) {
    this.state = newState;
    this.stateSubject.next(newState);
  }

  save() {
    if (this.activeTrack) {
      this.setState(SequencerStates.SAVING);
      this.confirm$
        .subscribe((title: string) => {
          this.activeTrack.title = title;
          this.saveSubject.next(this.activeTrack);
          this.setState(SequencerStates.STOP);
        });
    }
  }

  confirm(title: string) {
    if (title) {
      this.confirmSubject.next(title);
    }
  }

  cancel() {
    if (this.getState() === SequencerStates.SAVING) {
      this.activeTrack = null;
    }
    this.setState(SequencerStates.STOP);
    this.cancelSubject.next();
  }


  load() {
    this.setState(SequencerStates.LOADING);
    this.loadSubject.next();
  }
}
