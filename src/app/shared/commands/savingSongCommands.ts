import { Commands } from './commands';
import { Command } from '../../core/models/command';

export class SavingSongCommands implements Commands {
  get(context: any): Command[] {
    return [
      {
        label: 'cancel',
        exec: () => context.onCancel()
      },
      {
        label: 'confirm',
        exec: () => context.saveSong()
      },
      {} as Command,
      {} as Command
    ];
  }
}
