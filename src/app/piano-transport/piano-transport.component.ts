import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AppStates} from '../core/models/appStates';

@Component({
  selector: 'ht-piano-transport',
  templateUrl: './piano-transport.component.html',
  styleUrls: ['./piano-transport.component.sass']
})
export class PianoTransportComponent implements OnInit {
  @Input() state: AppStates;
  @Output() transportPlay = new EventEmitter();
  @Output() transportRecord = new EventEmitter();
  @Output() transportStop = new EventEmitter();

  constructor() {}

  ngOnInit() {}

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
    return this.state === AppStates.SEQUENCER_RECORDING;
  }

  isWaiting(): boolean {
    return this.state === AppStates.SEQUENCER_RECORDING_ARMED;
  }

  isPlaying() {
    return (
      this.state === AppStates.SEQUENCER_PLAYING ||
      this.state === AppStates.SEQUENCER_RECORDING
    );
  }
}
