import {DisplayComponent} from './display.component';
import {Component, Input} from '@angular/core';

@Component({
  template: `
      <span class="piano-display-line">Currently playing...</span>
      <span class="piano-display-line">{{data.activeSong?.title}}</span>
  `
})
export class PlayingSongDisplayComponent implements DisplayComponent {
  @Input() data: any;
  @Input() commands: any;
}
