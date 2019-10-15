import {Commands} from './commands';
import {DisplayControl} from '../../core/models/displayControl';

export class RecordingArmedCommands extends Commands {
  get(context: any): DisplayControl[] {
    return [];
  }
}
