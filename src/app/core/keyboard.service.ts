import { Injectable } from '@angular/core';
import { Key } from './models/key';
import { ReplaySubject } from 'rxjs';
import { Note } from './models/note';

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
        isPressed: false
      });
    }

    this.keysSubject.next(this.toArray());
  }

  noteOn(key: Key) {
    key.isPressed = true;
    this.trigger(key);
  }

  noteOff(key: Key) {
    key.isPressed = false;
    this.trigger(key);
  }

  toArray(): Key[] {
    return Array.from(this.keys.values()).map(val => val);
  }

  private trigger(key: Key) {
    this.keys.set(key.note.toMidi(), key);
    this.keysSubject.next(this.toArray());
  }
}
