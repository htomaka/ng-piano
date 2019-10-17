import {Commands} from './commands';
import {Command} from '../../core/models/command';

export class RecordingArmedCommands extends Commands {
  get(context: any): Command[] {
    return [];
  }
}
