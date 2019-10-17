import {Display} from './display';

export class PlayingSongDisplay extends Display {
  render(ctx: any): string[] {
    return [
      'Playing...',
      ctx.sequencer.activeTrack ? ctx.sequencer.activeTrack.title : 'No song'
    ];
  }
}
