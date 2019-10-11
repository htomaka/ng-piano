import {Key} from './key';

export class Event {
  note: Key;
  startTime: number;
  stopTime: number;

  constructor(note: Key, startTime: number) {
    this.note = note;
    this.startTime = startTime;
  }

  get duration(): number {
    return this.stopTime - this.startTime;
  }
}
