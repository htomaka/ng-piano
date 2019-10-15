import {Commands} from './commands';
import {DisplayControl} from '../../core/models/displayControl';

export class LoadingSongCommands extends Commands {
  get(context: any): DisplayControl[] {
    return [
      {
        label: 'prev',
        command: () => context.onLoad()
      },
      {
        label: 'next',
        command: () => console.log('next')
      },
      {
        label: 'cancel',
        command: () => context.onCancel()
      },
      {
        label: 'confirm',
        command: () => console.log('confirm load song')
      },
    ];
  }
}
