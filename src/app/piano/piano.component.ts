import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Key } from '../core/models/key';
import { InstrumentService } from '../core/instrument.service';
import { SequencerService } from '../core/sequencer.service';
import { Event } from '../core/models/event';
import { Note } from '../core/models/note';
import { midiCommand, MidiService } from '../core/midi.service';
import { KeyboardService } from '../core/keyboard.service';
import { AudioContextService } from '../core/audio-context.service';
import { LibraryService } from '../core/library.service';
import { switchMap, take } from 'rxjs/operators';
import { Track } from '../core/models/track';
import { CommandsService } from '../shared/commands/commands.service';
import {AppStates} from '../core/models/appStates';

@Component({
  selector: 'ht-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {
  public keys: Key[];
  public tracks: Track[];
  public commands$ = this.commands.commands$;
  public state$ = this.sequencer.state$;

  constructor(
    private instrument: InstrumentService,
    private sequencer: SequencerService,
    private midi: MidiService,
    private keyboard: KeyboardService,
    private changeDetector: ChangeDetectorRef,
    private audio: AudioContextService,
    private library: LibraryService,
    private commands: CommandsService
  ) {}

  ngOnInit() {
    this.library
      .loadBank('m1_piano')
      .pipe(switchMap(soundBank => this.instrument.load(soundBank)))
      .subscribe();

    this.midi.getMidi().subscribe();

    this.midi.midiMessage$.subscribe(event => {
      if (event.type === midiCommand.NOTE_ON) {
        const key = {
          note: new Note(event.note),
          isActive: true
        };
        this.instrumentPlay(key);
      } else {
        const key = {
          note: new Note(event.note),
          isActive: false
        };
        this.instrumentStop(key);
      }
    });

    this.keyboard.build();

    this.keyboard.keys$.subscribe(keys => {
      this.keys = keys;
      this.changeDetector.detectChanges();
    });

    this.commands.get(this, this.sequencer.getState());

    this.sequencer.state$.subscribe((state: AppStates) => {
      this.commands.get(this, state);
    });
  }

  instrumentPlay(key: Key) {
    this.instrument.play(key);
    this.keyboard.noteOn(key);
    if (this.sequencer.getState() === AppStates.SEQUENCER_RECORDING) {
      this.sequencer.noteOn(key);
    }
  }

  transportRecord() {
    this.sequencer.record();
  }

  instrumentStop(key: Key) {
    this.keyboard.noteOff(key);
    if (this.sequencer.getState() === AppStates.SEQUENCER_RECORDING) {
      this.sequencer.noteOff(key);
    }
  }

  transportStart() {
    this.sequencer.play((event: Event) => {
      const now = this.audio.getCurrentTime();
      const secondsPerBeat = 60.0 / 60;
      const newEvent = new Event(
        event.note,
        now + event.startTime * secondsPerBeat
      );
      newEvent.stopTime = now + event.stopTime * secondsPerBeat;
      this.instrument.playback(newEvent);
      setTimeout(() => {
        this.keyboard.noteOn(event.note);
      }, event.startTime * 1000);

      setTimeout(() => {
        this.keyboard.noteOff(event.note);
      }, event.stopTime * 1000);
    });
  }

  transportStop() {
    this.sequencer.stop();
  }

  onCancel() {
    this.sequencer.cancel();
  }

  onLoad() {
    this.sequencer.load();
    this.sequencer.load$
      .pipe(
        take(1),
        switchMap(() => {
          return this.library.loadTracks();
        })
      )
      .subscribe((tracks: Track[]) => {
        this.tracks = tracks;
      });
  }

  loadNextSong() {
    this.library.nextTrack();
  }

  loadPrevSong() {
    this.library.prevTrack();
  }

  saveSong(): void {
    this.sequencer.confirmSaveSong();
    this.sequencer.save$
      .pipe(
        take(1),
        switchMap((track: Track) => this.library.saveTrack(track))
      )
      .subscribe();
  }

  loadSong() {
    return this.library
      .loadTrack()
      .pipe(take(1))
      .subscribe((song: Track) => {
        this.sequencer.confirmLoadSong(song);
      });
  }
}
