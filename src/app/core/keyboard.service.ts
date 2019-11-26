import {Injectable} from '@angular/core';
import {Key} from './models/key';
import {ReplaySubject} from 'rxjs';
import {Note} from './models/note';
import {Event} from './models/event';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private keys: Map<number, Key> = new Map();
  private keysSubject = new ReplaySubject<Key[]>(1);

  public keys$ = this.keysSubject.asObservable();

  public build(low = 24, high = 101): void {
    for (let i = low; i <= high; i++) {
      this.keys.set(i, {
        note: new Note(i),
        isActive: false
      });
    }

    this.keysSubject.next(this.toArray());
  }

  noteOn(key: Key) {
    key.isActive = true;
    this.trigger(key);
  }

  noteOff(key: Key) {
    key.isActive = false;
    this.trigger(key);
  }

  toArray(): Key[] {
    return Array.from(this.keys.values()).map(val => val);
  }

  scheduleNoteOn(event: Event) {
    this.noteOn({note: new Note(event.note), isActive: true});
  }

  scheduleNoteOff(event: Event) {
    setTimeout(() => {
      this.noteOff({note: new Note(event.note), isActive: false});
    }, event.stopTime - event.startTime);
  }

  private trigger(key: Key) {
    this.keys.set(key.note.toMidi(), key);
    this.keysSubject.next(this.toArray());
  }
}
