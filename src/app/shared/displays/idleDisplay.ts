import {Display} from './display';

export class IdleDisplay extends Display {
  render(ctx: any): string[] {
    return [
      'M1 Piano',
      ctx.sequencer.activeTrack ? ctx.sequencer.activeTrack.title : 'No song'
    ];
  }

}
