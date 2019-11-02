import { DisplayComponent } from './display.component';
import {Component, Input, OnInit} from '@angular/core';
import {Track} from '../../core/models/track';

@Component({
  template: `
      <span class="piano-display-line">Load song</span>
      <span class="piano-display-line">{{activeSong?.title || 'No songs in library'}}</span>
      <div class="piano-display-menu">
          <span class="piano-display-menu-item">Prev</span>
          <span class="piano-display-menu-item">Next</span>
          <span class="piano-display-menu-item">Cancel</span>
          <span class="piano-display-menu-item">Confirm</span>
      </div>
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
