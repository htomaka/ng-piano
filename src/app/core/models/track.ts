import { Event } from './event';

export class Track {

  constructor(startTime: number) {
    this.startTime = startTime;
  }
  public title = 'New song';
  public startTime: number;
  public notes: Event[] = [];

  static from(track: Track) {
    const newTrack = new Track(track.startTime);
    newTrack.title = track.title;
    newTrack.startTime = track.startTime;
    newTrack.notes = track.notes;
    return newTrack;
  }

  add(event: Event) {
    this.notes.push(event);
  }

  forEachNote(fn: (note: Event) => void) {
    this.notes.forEach(fn);
  }

  setTitle(title: string) {
    this.title = title;
  }
}
