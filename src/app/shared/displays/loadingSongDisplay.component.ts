import { DisplayComponent } from './display.component';
import {Component, Input, OnInit} from '@angular/core';
import {Track} from '../../core/models/track';

@Component({
  template: `
      <span class="piano-display-line">Load song</span>
      <span class="piano-display-line">{{activeSong?.title || 'No songs in library'}}</span>
      <span class="inverted">Prev</span>
      <span class="inverted">Next</span>
      <span class="inverted">Cancel</span>
      <span class="inverted">Confirm</span>
  `
})
export class LoadingSongDisplayComponent implements DisplayComponent, OnInit {
  @Input() data: any;
  @Input() commands: any;

  activeSong: Track;

  ngOnInit() {
    this.data.activeSong$.subscribe(activeSong => {
      this.activeSong = activeSong;
    });
  }
}
