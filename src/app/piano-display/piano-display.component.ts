import {Component, Input, OnInit} from '@angular/core';
import {Command} from '../core/models/command';

@Component({
  selector: 'ht-piano-display',
  templateUrl: './piano-display.component.html',
  styleUrls: ['./piano-display.component.sass']
})
export class PianoDisplayComponent implements OnInit {
  @Input() lines: string[];
  @Input() controls: Command[];

  constructor() { }

  ngOnInit() {
  }

}
