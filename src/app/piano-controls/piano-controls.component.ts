import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ht-piano-controls',
  templateUrl: './piano-controls.component.html',
  styleUrls: ['./piano-controls.component.sass']
})
export class PianoControlsComponent implements OnInit {
  @Output() play = new EventEmitter();
  @Output() record = new EventEmitter();
  @Output() stop = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handlePlay(): void {
    this.play.emit();
  }

  handleStop(): void {
    this.stop.emit();
  }

  handleRecord(): void {
    this.record.emit();
  }
}
