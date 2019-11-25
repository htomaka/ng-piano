import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Key } from '../core/models/key';

@Component({
  selector: 'ht-piano-keyboard',
  templateUrl: './piano-keyboard.component.html',
  styleUrls: ['./piano-keyboard.component.sass']
})
export class PianoKeyboardComponent implements OnInit {
  @Output() noteOn = new EventEmitter<Key>();
  @Output() noteOff = new EventEmitter<Key>();
  @Input() keys: Key[];

  constructor() {}

  ngOnInit() {}

  public handleNoteOn(key: Key) {
    this.noteOn.emit(key);
  }

  public handleNoteOff(key: Key) {
    this.noteOff.emit(key);
  }
}
