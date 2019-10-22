import { Type } from '@angular/core';

export class DisplayItem {
  constructor(public component: Type<any>, public data: any, public commands: any) {}
}
