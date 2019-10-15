import {Commands} from './commands';
import {DisplayControl} from '../../core/models/displayControl';

export class SavingSongCommands extends Commands {
  get(context: any): DisplayControl[] {
    return [
      {
        label: 'cancel',
        command: () => context.onCancel()
      },
      {
        label: 'confirm',
        command: () => context.onConfirm()
      },
      {} as DisplayControl,
      {} as DisplayControl
    ];
  }

}
