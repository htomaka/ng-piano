import {DisplayComponent} from './display.component';
import {Component, Input} from '@angular/core';

@Component({
  template: `
      <span class="piano-display-line">Save song</span>
      <input type="text" [(ngModel)]="data.activeSong.title" (ngModelChange)="commands.onChangeTitle($event)">
      <span class="inverted">Cancel</span>
      <span class="inverted">Confirm</span>
  `
})
export class SavingSongDisplayComponent implements DisplayComponent {
  @Input() data: any;
  @Input() commands: any;
}



