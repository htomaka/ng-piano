import {Commands} from './commands';
import {DisplayControl} from '../../core/models/displayControl';

export class IdleCommands extends Commands {
  get(context: any): DisplayControl[] {
    return [
      {
        label: 'load songs',
        command: () => context.onLoad()
      },
      {
        label: 'load sounds',
        command: () => console.log('load instrument')
      },
      {} as DisplayControl,
      {} as DisplayControl
    ];
  }

}
