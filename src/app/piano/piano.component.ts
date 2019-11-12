import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Key} from '../core/models/key';
import {InstrumentService} from '../core/instrument.service';
import {SequencerService} from '../core/sequencer.service';
import {Event} from '../core/models/event';
import {Note} from '../core/models/note';
import {midiCommand, MidiService} from '../core/midi.service';
import {KeyboardService} from '../core/keyboard.service';
import {AudioContextService} from '../core/audio-context.service';
import {TracksService} from '../core/tracks.service';
import {switchMap, take} from 'rxjs/operators';
import {Track} from '../core/models/track';
import {CommandsService} from '../shared/commands/commands.service';
import {AppStates} from '../core/models/appStates';
import {SoundsService} from '../core/sounds.service';
import {TransportService} from '../core/transport.service';

@Component({
  selector: 'ht-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {
  public keys: Key[];
  public trackList: Track[];
  public commands$ = this.commands.commands$;
  public state$ = this.sequencer.state$;

  constructor(
    private instrument: InstrumentService,
    private sequencer: SequencerService,
    private midi: MidiService,
    private keyboard: KeyboardService,
    private changeDetector: ChangeDetectorRef,
    private audio: AudioContextService,
    private tracks: TracksService,
    private commands: CommandsService,
    private sounds: SoundsService,
    private transport: TransportService
  ) {
  }

  ngOnInit() {
    this.loadInstrument('M1_piano');
    this.initMidi();
    this.initKeyboard();
    this.initSequencer();

    this.commands.get(this, this.sequencer.getState());
  }

  instrumentPlay(key: Key) {
    this.instrument.play(key.note.toMidi());
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
      this.transport.schedule(event, this.instrument.playAtTime.bind(this.instrument));
      this.keyboard.scheduleNoteOn(event);
      this.keyboard.scheduleNoteOff(event);
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
          return this.tracks.getAll();
        })
      )
      .subscribe((tracks: Track[]) => {
        this.trackList = tracks;
      });
  }

  loadNextSong() {
    this.tracks.nextTrack();
  }

  loadPrevSong() {
    this.tracks.prevTrack();
  }

  saveSong(): void {
    this.sequencer.confirmSaveSong();
    this.sequencer.save$
      .pipe(
        take(1),
        switchMap((track: Track) => this.tracks.save(track))
      )
      .subscribe();
  }

  loadSong() {
    return this.tracks
      .get()
      .pipe(take(1))
      .subscribe((song: Track) => {
        this.sequencer.confirmLoadSong(song);
      });
  }


  private loadInstrument(name: string) {
    this.sounds
      .load(name)
      .pipe(switchMap(soundBank => this.instrument.load(soundBank)))
      .subscribe();
  }

  private initMidi() {
    this.midi.getMidi().subscribe();
    this.midi.midiMessage$.subscribe(msg => {
      const event = {
        note: new Note(msg.note),
        isActive: msg.type === midiCommand.NOTE_ON
      };

      if (msg.type === midiCommand.NOTE_ON) {
        this.instrumentPlay(event);
      } else {
        this.instrumentStop(event);
      }
    });
  }

  private initKeyboard() {
    this.keyboard.build();

    this.keyboard.keys$.subscribe(keys => {
      this.keys = keys;
      this.changeDetector.detectChanges();
    });
  }

  private initSequencer() {
    this.sequencer.state$.subscribe((state: AppStates) => {
      this.commands.get(this, state);
    });
  }
}
