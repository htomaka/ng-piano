import {Injectable} from '@angular/core';
import {AudioContextService} from '../audio-context.service';
import {Event} from '../event';
import {Key} from '../key';
import {TickerService} from '../ticker.service';
import {Part} from '../part';

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
  private activeSong: Part;
  private state: SequencerStates = SequencerStates.IDLE;
  private tempo = 60;

  constructor(private audioContextService: AudioContextService) {
  }

  scheduleNote(key: Key) {
    const event = new Event(key, this.audioContextService.getCurrentTime() - this.activeSong.startTime);
    this.activeSong.add(event);
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
      const now = this.audioContextService.getCurrentTime();
      const secondsPerBeat = 60.0 / this.tempo;
      this.activeSong.forEachNote(note => {
        fn({note: note.note, startTime: now + note.startTime * secondsPerBeat});
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
