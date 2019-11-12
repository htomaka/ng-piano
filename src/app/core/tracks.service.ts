import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject, Subject, throwError} from 'rxjs';
import {Track} from './models/track';
import {catchError, map, startWith, tap} from 'rxjs/operators';
import {SongsService} from './gql/songs.service';
import {SaveSongResponse, SaveSongService} from './gql/save-song.service';
import {FetchResult} from 'apollo-link';
import {AppStates} from './models/appStates';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private activeTrackSubject = new ReplaySubject<Track>(1);
  private activeTrackIndex = -1;
  private state: AppStates;
  public tracks: Track[] = [];
  public activeTrack$ = this.activeTrackSubject.asObservable();

  constructor(private songsGql: SongsService, private saveSongGql: SaveSongService) {
  }

  save(track: Track): Observable<FetchResult<any>> {
    this.tracks.push(track);
    return this.saveSongGql.mutate({
      song: track.toJSON()
    });
  }

  getAll(): Observable<Track[]> {
    this.activeTrackIndex = -1;
    return this.songsGql.fetch()
      .pipe(
        map(result => result.data.songs),
        tap((songs: Track[]) => this.tracks = songs),
        tap(() => this.nextTrack())
      );
  }

  get(): Observable<Track> {
    return this.activeTrackIndex > -1
      ? of(this.loadPreview())
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

  private loadPreview(): Track {
    if (!this.tracks.length) {
      return;
    }
    return this.tracks[this.activeTrackIndex];
  }
}
