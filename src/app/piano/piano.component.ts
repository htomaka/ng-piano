import { Component, OnInit } from '@angular/core';
import {Key} from '../piano-keyboard/piano-key/model/key';
import {InstrumentService} from '../core/instrument.service';

@Component({
  selector: 'ht-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.sass']
})
export class PianoComponent implements OnInit {

  constructor(private instrument: InstrumentService) { }

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

  play(key: Key) {
    this.instrument.play(key);
  }

}
