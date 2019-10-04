import {Event} from './event';

export class Part {
  public startTime: number;
  private notes: Event[] = [];

  constructor(startTime: number) {
    this.startTime = startTime;
  }

  add(event: Event) {
    this.notes.push(event);
  }

  getNotes(): Event[] {
    return this.notes;
  }

  forEachNote(fn: (note: Event) => void) {
    this.getNotes().forEach(fn);
  }
}
