import { DisplayComponent } from './display.component';
import {Component, Input} from '@angular/core';

@Component({
  template: `
      <span class="piano-display-line">{{data.activeInstrument}}</span>
      <span class="piano-display-line">{{data.activeSong?.title || 'No song'}}</span>
      <span class="inverted">Songs</span>
      <span class="inverted">Sounds</span>
  `
})
export class IdleDisplayComponent implements DisplayComponent {
  @Input() data: any;
  @Input() commands: any;
}
