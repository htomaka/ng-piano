import {Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DisplayDirective} from '../shared/displays/display.directive';
import {DisplayService} from '../shared/displays/display.service';
import {DisplayItem} from '../shared/displays/display-item';
import {AppStates} from '../core/models/states';

@Component({
  selector: 'ht-piano-display',
  templateUrl: './piano-display.component.html',
  styleUrls: ['./piano-display.component.sass']
})
export class PianoDisplayComponent implements OnInit, OnChanges {
  @ViewChild(DisplayDirective, {static: true}) displayHost: DisplayDirective;
  @Input() state: AppStates;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private displayService: DisplayService) {}

  ngOnInit() {
    this.loadDisplay(AppStates.SEQUENCER_STOP);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.state.currentValue) {
      this.loadDisplay(changes.state.currentValue);
    }
  }

  loadDisplay(state: AppStates) {
    const displayItem: DisplayItem = this.displayService.getDisplay(state);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(displayItem.component);
    const viewContainerRef = this.displayHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.instance.data = displayItem.data;
    componentRef.instance.commands = displayItem.commands;
  }
}
