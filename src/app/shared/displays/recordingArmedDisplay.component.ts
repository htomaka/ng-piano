import { DisplayComponent } from './display.component';
import {Component, Input} from '@angular/core';

@Component({
  template: `<span class="piano-display-line">Recording armed</span>`
})
export class RecordingArmedDisplayComponent implements DisplayComponent {
  @Input() data: any;
  @Input() commands: any;
}
