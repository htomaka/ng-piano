import {Key} from './key';

export class Event {
  note: Key;
  startTime: number;

  constructor(note: Key, startTime: number) {
    this.note = note;
    this.startTime = startTime;
  }
}
