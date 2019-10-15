import {Component, Input, OnInit} from '@angular/core';
import {DisplayControl} from '../core/models/displayControl';

@Component({
  selector: 'ht-piano-display',
  templateUrl: './piano-display.component.html',
  styleUrls: ['./piano-display.component.sass']
})
export class PianoDisplayComponent implements OnInit {
  @Input() lines: string[];
  @Input() controls: DisplayControl[];

  constructor() { }

  ngOnInit() {
  }

}
