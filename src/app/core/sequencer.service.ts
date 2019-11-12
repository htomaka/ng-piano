import {Injectable} from '@angular/core';
import {AudioContextService} from './audio-context.service';
import {Event} from './models/event';
import {Key} from './models/key';
import {ReplaySubject, Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {Track} from './models/track';
import {AppStates} from './models/appStates';
import {get} from 'lodash';
import {SequencerCommand, sequencerCommands} from './sequencer-commands';
import {TransportService} from './transport.service';

@Injectable({
  providedIn: 'root'
})
export class SequencerService {
  private state: AppStates = AppStates.SEQUENCER_STOP;
  private stopSubject = new Subject<Key>();
  private cancelSubject = new Subject();
  private loadSubject = new ReplaySubject(1);
  private confirmSubject = new Subject<string>();
  private saveSubject = new ReplaySubject<Track>(1);
  private stateSubject = new Subject<AppStates>();
  private readonly commands: SequencerCommand;
  public activeTrack: Track;
  public stop$ = this.stopSubject.asObservable();
  public load$ = this.loadSubject.asObservable();
  public confirm$ = this.confirmSubject.asObservable();
  public save$ = this.saveSubject.asObservable();
  public state$ = this.stateSubject.asObservable();

  constructor(public transport: TransportService) {
    this.commands = sequencerCommands(this);
  }

  noteOn(key: Key) {
    const event = new Event(key.note.toMidi(), this.transport.getCurrentTime());
    this.scheduleNote(event);
  }

  noteOff(key: Key) {
    this.stopSubject.next(key);
  }

  scheduleNote(event: Event) {
    // schedule note on note off event in order to get note duration
    this.stop$.pipe(take(1)).subscribe(() => {
      event.stopTime = this.transport.getCurrentTime();
      this.activeTrack.add(event);
    });
  }

  record() {
    this.setState(AppStates.SEQUENCER_RECORDING_ARMED);
    this.activeTrack = new Track(this.transport.getCurrentTime());
  }

  play(fn: (event: Event) => void) {
    const command = get(this.commands, this.getState());
    if (command && command.play) {
      command.play(fn);
    }
  }

  stop() {
    const command = get(this.commands, this.getState());
    if (command && command.stop) {
      command.stop();
    }
  }

  getState(): AppStates {
    return this.state;
  }

  setState(newState: AppStates) {
    this.state = newState;
    this.stateSubject.next(newState);
  }

  save() {
    if (this.activeTrack) {
      this.setState(AppStates.LIBRARY_SAVING_SONG);
      this.confirm$.subscribe(() => {
        this.saveSubject.next(this.activeTrack);
        this.setState(AppStates.SEQUENCER_STOP);
      });
    }
  }

  confirmSaveSong() {
    this.confirmSubject.next();
  }

  cancel() {
    if (this.getState() === AppStates.LIBRARY_SAVING_SONG) {
      this.activeTrack = null;
    }
    this.setState(AppStates.SEQUENCER_STOP);
    this.cancelSubject.next();
  }

  load() {
    this.setState(AppStates.LIBRARY_LOADING_SONG);
    this.loadSubject.next();
  }

  confirmLoadSong(track: Track) {
    if (!track) {
      return;
    }
    this.setActiveTrack(track);
    this.setState(AppStates.SEQUENCER_STOP);
  }

  setActiveTrack(track: Track) {
    this.activeTrack = Track.from(track);
  }
}
