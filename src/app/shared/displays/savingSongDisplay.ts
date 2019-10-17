import {Display} from './display';

export class SavingSongDisplay extends Display {
  render(ctx: any): string[] {
    return [
      'Save song?',
      ctx.sequencer.activeTrack.title
    ];
  }
}
