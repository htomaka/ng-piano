import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError, tap} from 'rxjs/operators';
import {merge, Observable, Subject, throwError} from 'rxjs';
import MIDIAccess = WebMidi.MIDIAccess;
import MIDIMessageEvent = WebMidi.MIDIMessageEvent;

@Injectable({
  providedIn: 'root'
})
export class MidiService {
  private midiAccess$: Observable<MIDIAccess> = fromPromise(navigator.requestMIDIAccess());
  private midiNoteOn = new Subject<MidiEvent>();
  private midiNoteOff = new Subject<MidiEvent>();
  public midiMessage$ = merge(this.midiNoteOn.asObservable(), this.midiNoteOff.asObservable());

  constructor() {
  }

  getMidi() {
    const midiAccess$ = this.midiAccess$;
    return midiAccess$.pipe(
      tap((midiAccess: MIDIAccess) => {
        this.scanInputs(midiAccess);
      }),
      catchError(e => {
        return throwError(e);
      })
    );
  }

  private scanInputs(midiAccess: MIDIAccess) {
    for (const input of midiAccess.inputs.values()) {
      input.onmidimessage = this.getMIDIMessage.bind(this);
    }
  }

  private getMIDIMessage(message: MIDIMessageEvent) {
    const command = message.data[0];
    const note = message.data[1];
    const velocity = (message.data.length > 2) ? message.data[2] : 0;

    switch (command) {
      case 144: // noteOn
        if (velocity > 0) {
          this.midiNoteOn.next({note, velocity, type: 'NOTE_ON'});
        } else {
          this.midiNoteOn.next({note, type: 'NOTE_ON'});
        }
        break;
      case 128: // noteOff
        this.midiNoteOff.next({note, type: 'NOTE_OFF'});
        break;
    }
  }
}

interface MidiEvent {
  note: number;
  velocity?: number;
  type: 'NOTE_ON' | 'NOTE_OFF';
}
