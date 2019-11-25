import { DisplayComponent } from './display.component';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  template: `<span class="piano-display-line">{{position?.bar}}. {{position?.beat}}. {{position?.tick}}</span>`
})
export class RecordingSongDisplayComponent implements DisplayComponent, OnInit {
  @Input() data: any;
  @Input() commands: any;
  public position;

  ngOnInit(): void {
    this.data.position$.subscribe(() => {
      this.position = this.data.toBarBeatTick();
    });
  }
}

