import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Key} from './piano-key/model/key';
import {Note} from '../core/note';

@Component({
  selector: 'ht-piano-keyboard',
  templateUrl: './piano-keyboard.component.html',
  styleUrls: ['./piano-keyboard.component.sass']
})

export class PianoKeyboardComponent implements OnInit {
  @Output() trigger = new EventEmitter<Key>();
  public keys: Key[] = [];

  constructor() {
  }

  ngOnInit() {
    this.generateKeys();
  }

  public onKeyPressed(key: Key) {
    this.trigger.emit(key);
  }

  generateKeys() {
    const low = 24; // C1
    const high = 101; // C8
    for (let i = low; i <= high; i++) {
      this.keys = this.keys.concat({
        note: new Note(i),
        isPressed: false
      });
    }
  }

}
