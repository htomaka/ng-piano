import {Component, OnInit} from '@angular/core';
import {Key} from '../core/key';
import {InstrumentService} from '../core/instrument.service';
import {SequencerService, SequencerStates} from '../core/sequencer/sequencer.service';
import {Event} from '../core/event';
import {Note} from '../core/note';

@Component({
  selector: 'ht-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {

  constructor(private instrument: InstrumentService, private sequencer: SequencerService) {
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

  }

  instrumentPlay(key: Key) {
    console.log(key);
    this.instrument.play(key);

    if (this.sequencer.getState() === SequencerStates.RECORDING) {
      this.sequencer.scheduleNote(key);
    }
  }

  transportRecord() {
    this.sequencer.record();
  }

  instrumentStop(key: Key) {}

  transportStart() {
    this.sequencer.play((event: Event) => {
      this.instrument.playback(event);
    });
  }

  transportStop() {
    this.sequencer.stop();
  }

  keyPlay() {
    this.instrumentPlay({note: new Note(88), isPressed: true});
  }

}
