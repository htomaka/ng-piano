import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DisplayControl} from '../core/models/displayControl';

@Component({
  selector: 'ht-piano-controls',
  templateUrl: './piano-controls.component.html',
  styleUrls: ['./piano-controls.component.sass']
})
export class PianoControlsComponent implements OnInit {
  @Input() controls: DisplayControl[];

  constructor() { }

  ngOnInit() {
  }

}
