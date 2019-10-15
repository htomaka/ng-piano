import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Key} from '../core/models/key';
import {InstrumentService} from '../core/instrument.service';
import {SequencerService, SequencerStates} from '../core/sequencer.service';
import {Event} from '../core/models/event';
import {Note} from '../core/models/note';
import {midiCommand, MidiService} from '../core/midi.service';
import {KeyboardService} from '../core/keyboard.service';
import {AudioContextService} from '../core/audio-context.service';
import {LibraryService} from '../core/library.service';
import {switchMap, take, tap} from 'rxjs/operators';
import {Track} from '../core/models/track';
import {Subject} from 'rxjs';
import {DisplayControl} from '../core/models/displayControl';
import {LoadingSongCommands} from '../shared/controls/loadingSongCommands';
import {SavingSongCommands} from '../shared/controls/savingSongCommands';
import {IdleCommands} from '../shared/controls/idleCommands';
import {RecordingSongCommands} from '../shared/controls/recordingSongCommands';
import {RecordingArmedCommands} from '../shared/controls/recordingArmedCommands';
import {PlayingSongsCommands} from '../shared/controls/playingSongsCommands';

@Component({
  selector: 'ht-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {
  private displaySubject = new Subject<string[]>();
  private controlsSubject = new Subject<DisplayControl[]>();
  public keys: Key[];
  public tracks: Track[];
  public display$ = this.displaySubject.asObservable();
  public controls$ = this.controlsSubject.asObservable();

  constructor(
    private instrument: InstrumentService,
    private sequencer: SequencerService,
    private midi: MidiService,
    private keyboard: KeyboardService,
    private changeDetector: ChangeDetectorRef,
    private audio: AudioContextService,
    private library: LibraryService
  ) {
  }

  ngOnInit() {
    this.library.loadBank('m1_piano').pipe(
      switchMap(soundBank => this.instrument.load(soundBank))
    ).subscribe();

    this.midi.getMidi().subscribe();

    this.midi.midiMessage$.subscribe(event => {
      if (event.type === midiCommand.NOTE_ON) {
        const key = {
          note: new Note(event.note),
          isPressed: true
        };
        this.instrumentPlay(key);
      } else {
        const key = {
          note: new Note(event.note),
          isPressed: false
        };
        this.instrumentStop(key);
      }
    });

    this.keyboard.build();

    this.keyboard.keys$.subscribe(keys => {
      this.keys = keys;
      this.changeDetector.detectChanges();
    });

    this.getDisplay();
    this.getCommands();
    this.sequencer.state$.subscribe(() => {
      this.getDisplay();
      this.getCommands();
    });
  }

  instrumentPlay(key: Key) {
    this.instrument.play(key);
    this.keyboard.noteOn(key);
    if (this.sequencer.getState() === SequencerStates.RECORDING) {
      this.sequencer.noteOn(key);
    }
  }

  transportRecord() {
    this.sequencer.record();
  }

  instrumentStop(key: Key) {
    this.keyboard.noteOff(key);
    if (this.sequencer.getState() === SequencerStates.RECORDING) {
      this.sequencer.noteOff(key);
    }
  }

  transportStart() {
    this.sequencer.play((event: Event) => {
      const now = this.audio.getCurrentTime();
      const secondsPerBeat = 60.0 / 60;
      const newEvent = new Event(event.note, now + event.startTime * secondsPerBeat);
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

  getDisplay() {
    let nextDisplay = [];
    switch (this.sequencer.getState()) {
      case SequencerStates.PLAYING:
        nextDisplay = [
          'Playing...',
          this.sequencer.activeTrack ? this.sequencer.activeTrack.title : 'No song'
        ];
        break;
      case SequencerStates.RECORDING_ARMED:
        nextDisplay = [
          'Recording armed...',
          'Be ready!'
        ];
        break;
      case SequencerStates.RECORDING:
        nextDisplay = [
          'Recording...',
          this.sequencer.activeTrack.title
        ];
        break;
      case SequencerStates.SAVING:
        nextDisplay = [
          'Save song?',
          this.sequencer.activeTrack.title
        ];
        break;
      case SequencerStates.LOADING:
        nextDisplay = [
          'Load song?',
          (this.tracks && this.tracks.map(t => t.title).join(', ')) || 'No songs recorded'
        ];
        break;
      default:
        nextDisplay = [
          'M1 Piano',
          this.sequencer.activeTrack ? this.sequencer.activeTrack.title : 'No song'
        ];
    }

    this.displaySubject.next(nextDisplay);
  }

  getCommands() {
    let nextControls = [];
    switch (this.sequencer.getState()) {
      case SequencerStates.PLAYING:
        nextControls = new PlayingSongsCommands().get(this);
        break;
      case SequencerStates.RECORDING_ARMED:
        nextControls = new RecordingArmedCommands().get(this);
        break;
      case SequencerStates.RECORDING:
        nextControls = new RecordingSongCommands().get(this);
        break;
      case SequencerStates.SAVING:
        nextControls = new SavingSongCommands().get(this);
        break;
      case SequencerStates.LOADING:
        nextControls = new LoadingSongCommands().get(this);
        break;
      default:
        nextControls = new IdleCommands().get(this);
    }

    this.controlsSubject.next(nextControls);
  }

  onCancel() {
    this.sequencer.cancel();
  }

  onSave() {
    this.sequencer.save();
  }

  onLoad() {
    this.sequencer.load();
    this.sequencer.load$
      .pipe(
        take(1),
        switchMap(() => {
          return this.library.loadTracks();
        }),
      )
      .subscribe((tracks: Track[]) => {
        this.tracks = tracks;
        this.getDisplay();
      });
  }

  onConfirm(): void {
    this.sequencer.confirm('my song');
    this.sequencer.save$.pipe(
      take(1),
      switchMap((track: Track) => this.library.saveTrack(track))
    ).subscribe();
  }
}
