import {DisplayComponent} from './display.component';
import {Component, Input} from '@angular/core';

@Component({
  template: `
      <span class="piano-display-line">Save song</span>
      <input class="piano-display-input" type="text" [(ngModel)]="data.activeSong.title" (ngModelChange)="commands.onChangeTitle($event)" autofocus>
      <div class="piano-display-menu">
          <span class="piano-display-menu-item">Cancel</span>
          <span class="piano-display-menu-item">Confirm</span>
      </div>
  `
})
export class SavingSongDisplayComponent implements DisplayComponent {
  @Input() data: any;
  @Input() commands: any;
}



