import {Display} from './display';
import {SequencerService} from '../../core/sequencer.service';
import {LibraryService} from '../../core/library.service';

export class LoadingSongDisplay extends Display {
  constructor() {
    super();
  }

  render(ctx: any): string[] {
    return [
      'Load song?',
      ctx.tracks && ctx.tracks.map(t => t.title).join(', ') || 'No songs recorded'
    ];
  }
}
