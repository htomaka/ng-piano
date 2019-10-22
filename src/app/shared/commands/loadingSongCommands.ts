import { Commands } from './commands';
import { Command } from '../../core/models/command';

export class LoadingSongCommands implements Commands {
  get(context: any): Command[] {
    return [
      {
        label: 'prev',
        exec: () => context.loadPrevSong()
      },
      {
        label: 'next',
        exec: () => context.loadNextSong()
      },
      {
        label: 'cancel',
        exec: () => context.onCancel()
      },
      {
        label: 'confirm',
        exec: () => context.loadSong()
      }
    ];
  }
}
