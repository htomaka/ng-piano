import { Commands } from './commands';
import { Command } from '../../core/models/command';

export class IdleCommands implements Commands {
  get(context: any): Command[] {
    return [
      {
        label: 'load songs',
        exec: () => context.onLoad()
      },
      {
        label: 'load sounds',
        exec: () => console.log('load instrument')
      },
      {} as Command,
      {} as Command
    ];
  }
}
