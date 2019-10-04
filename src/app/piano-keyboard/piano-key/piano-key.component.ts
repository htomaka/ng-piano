import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Key} from '../../core/key';

@Component({
  selector: 'ht-piano-key',
  templateUrl: './piano-key.component.html',
  styleUrls: ['./piano-key.component.sass']
})
export class PianoKeyComponent implements OnInit {
  @Input() key: Key;
  @Input() index: number;
  @Output() noteOn = new EventEmitter<Key>();
  @Output() noteOff = new EventEmitter<Key>();

  constructor() { }

  ngOnInit() {
  }

  handleNoteOn() {
    this.key.isPressed = true;
    this.noteOn.emit(this.key);
  }

  handleNoteOff() {
    this.key.isPressed = false;
    this.noteOff.emit(this.key);
  }
}
