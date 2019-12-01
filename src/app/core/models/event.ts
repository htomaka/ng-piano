import { Key } from './key';

export class Event {
  note: number;
  startTime: number;
  stopTime: number;

  constructor(note: number, startTime: number) {
    this.note = note;
    this.startTime = startTime;
  }
}
