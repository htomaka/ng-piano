import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Key} from '../core/models/key';
import {InstrumentService} from '../core/instrument.service';
import {SequencerService, SequencerStates} from '../core/sequencer.service';
import {Event} from '../core/models/event';
import {Note} from '../core/models/note';
import {midiCommand, MidiService} from '../core/midi.service';
import {KeyboardService} from '../core/keyboard.service';
import {Subscription} from 'rxjs';
import {AudioContextService} from '../core/audio-context.service';

@Component({
  selector: 'ht-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {
  public keys: Key[];

  constructor(
    private instrument: InstrumentService,
    private sequencer: SequencerService,
    private midi: MidiService,
    private keyboard: KeyboardService,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.instrument.load({
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
    }).subscribe();

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
      this.instrument.playback(event);
    });
  }

  transportStop() {
    this.sequencer.stop();
  }
}
