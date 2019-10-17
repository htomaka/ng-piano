import {Display} from './display';

export class RecordingSongDisplay extends Display {
  render(ctx: any): string[] {
    return [
      'Recording...',
      ctx.sequencer.activeTrack.title
    ];
  }
}
