import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SequencerStates} from '../core/sequencer.service';

@Component({
  selector: 'ht-piano-transport',
  templateUrl: './piano-transport.component.html',
  styleUrls: ['./piano-transport.component.sass']
})
export class PianoTransportComponent implements OnInit {
  @Input() state: SequencerStates;
  @Output() transportPlay = new EventEmitter();
  @Output() transportRecord = new EventEmitter();
  @Output() transportStop = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  handlePlay(): void {
    this.transportPlay.emit();
  }

  handleStop(): void {
    this.transportStop.emit();
  }

  handleRecord(): void {
    this.transportRecord.emit();
  }

  isRecording(): boolean {
    return this.state === SequencerStates.RECORDING;
  }

  isWaiting(): boolean {
    return this.state === SequencerStates.RECORDING_ARMED;
  }

  isPlaying() {
    return this.state === SequencerStates.PLAYING || this.state === SequencerStates.RECORDING;
  }
}
