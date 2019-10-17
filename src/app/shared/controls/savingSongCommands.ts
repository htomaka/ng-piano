import {Commands} from './commands';
import {Command} from '../../core/models/command';

export class SavingSongCommands extends Commands {
  get(context: any): Command[] {
    return [
      {
        label: 'cancel',
        exec: () => context.onCancel()
      },
      {
        label: 'confirm',
        exec: () => context.onConfirm()
      },
      {} as Command,
      {} as Command
    ];
  }

}
