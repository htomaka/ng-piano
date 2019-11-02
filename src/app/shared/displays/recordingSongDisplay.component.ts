import { DisplayComponent } from './display.component';
import {Component, Input} from '@angular/core';

@Component({
  template: `<span class="piano-display-line">Recording song</span>`
})
export class RecordingSongDisplayComponent implements DisplayComponent {
  @Input() data: any;
  @Input() commands: any;
}

