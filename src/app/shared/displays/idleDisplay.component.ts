import { DisplayComponent } from './display.component';
import {Component, Input} from '@angular/core';

@Component({
  template: `
      <span class="piano-display-line">{{data.activeInstrument}}</span>
      <span class="piano-display-line">{{data.activeSong?.title || 'No song'}}</span>
      <div class="piano-display-menu">
          <span class="piano-display-menu-item">Songs</span>
          <span class="piano-display-menu-item">Sounds</span>
      </div>
  `
})
export class IdleDisplayComponent implements DisplayComponent {
  @Input() data: any;
  @Input() commands: any;
}
