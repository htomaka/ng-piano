import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[htDisplayHost]',
})
export class DisplayDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
