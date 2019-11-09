import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject, throwError} from 'rxjs';
import { Track } from './models/track';
import {map, startWith, tap} from 'rxjs/operators';
import {SongsService} from './gql/songs.service';
import {SaveSongResponse, SaveSongService} from './gql/save-song.service';
import {FetchResult} from 'apollo-link';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private activeTrackSubject = new ReplaySubject<Track>(1);
  private activeTrackIndex = -1;
  public tracks: Track[] = [];
  public activeTrack$ = this.activeTrackSubject.asObservable();

  constructor(private songsGql: SongsService, private saveSongGql: SaveSongService) {}

  loadBank(soundBank: string): Observable<{ [key: string]: string }> {
    return of({
      24: 'assets/samples/M1piano/M1_Piano_C1.wav',
      30: 'assets/samples/M1piano/M1_Piano_F#1.wav',
      36: 'assets/samples/M1piano/M1_Piano_C2.wav',
      42: 'assets/samples/M1piano/M1_Piano_F#2.wav',
      48: 'assets/samples/M1piano/M1_Piano_C3.wav',
      54: 'assets/samples/M1piano/M1_Piano_F#3.wav',
      60: 'assets/samples/M1piano/M1_Piano_C4.wav',
      66: 'assets/samples/M1piano/M1_Piano_F#4.wav',
      72: 'assets/samples/M1piano/M1_Piano_C5.wav',
      78: 'assets/samples/M1piano/M1_Piano_F#5.wav',
      84: 'assets/samples/M1piano/M1_Piano_C6.wav',
      90: 'assets/samples/M1piano/M1_Piano_F#6.wav',
      96: 'assets/samples/M1piano/M1_Piano_C7.wav',
      102: 'assets/samples/M1piano/M1_Piano_F#7.wav'
    });
  }

  saveTrack(track: Track): Observable<FetchResult<any>> {
    return this.saveSongGql.mutate({
      song: track.toJSON()
    });
  }

  loadTracks(): Observable<Track[]> {
    this.activeTrackIndex = -1;
    return this.songsGql.fetch()
      .pipe(
        map(result => result.data.songs),
        tap((songs: Track[]) => this.tracks = songs),
        tap(() => this.nextTrack())
      );
  }

  loadTrack(): Observable<Track> {
    return this.activeTrackIndex > -1
      ? of(this.loadTrackPreview())
      : throwError(`song not found`);
  }

  nextTrack() {
    if (!this.tracks.length) {
      return;
    }
    this.activeTrackIndex = ++this.activeTrackIndex % this.tracks.length;
    this.activeTrackSubject.next(this.tracks[this.activeTrackIndex]);
  }

  prevTrack() {
    if (!this.tracks.length) {
      return;
    }
    if (this.activeTrackIndex > 0) {
      this.activeTrackIndex = --this.activeTrackIndex % (this.tracks.length - 1);
    } else {
      this.activeTrackIndex = this.tracks.length - 1;
    }
    this.activeTrackSubject.next(this.tracks[this.activeTrackIndex]);
  }

  loadTrackPreview(): Track {
    if (!this.tracks.length) {
      return;
    }
    return this.tracks[this.activeTrackIndex];
  }
}
