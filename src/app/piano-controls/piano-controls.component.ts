import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Command} from '../core/models/command';

@Component({
  selector: 'ht-piano-controls',
  templateUrl: './piano-controls.component.html',
  styleUrls: ['./piano-controls.component.sass']
})
export class PianoControlsComponent implements OnInit {
  @Input() controls: Command[];

  constructor() { }

  ngOnInit() {
  }

}
