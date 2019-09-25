import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Key} from './model/key';

@Component({
  selector: 'ht-piano-key',
  templateUrl: './piano-key.component.html',
  styleUrls: ['./piano-key.component.sass']
})
export class PianoKeyComponent implements OnInit {
  @Input() key: Key;
  @Input() index: number;
  @Output() keyPress = new EventEmitter<Key>();

  constructor() { }

  ngOnInit() {
  }

  onMouseDown() {
    this.key.isPressed = true;
    this.keyPress.emit(this.key);
  }

  onMouseUp() {
    this.key.isPressed = false;
  }
}
