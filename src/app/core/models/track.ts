import { Event } from './event';

export class Track {
  public title = 'New song';
  public startTime: number;
  public notes: Event[] = [];

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

  setTitle(title: string) {
    this.title = title;
  }
}
