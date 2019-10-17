import {Commands} from './commands';
import {Command} from '../../core/models/command';

export class LoadingSongCommands extends Commands {
  get(context: any): Command[] {
    return [
      {
        label: 'prev',
        exec: () => context.onLoad()
      },
      {
        label: 'next',
        exec: () => console.log('next')
      },
      {
        label: 'cancel',
        exec: () => context.onCancel()
      },
      {
        label: 'confirm',
        exec: () => console.log('confirm load song')
      },
    ];
  }
}
