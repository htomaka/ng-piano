import { Commands } from './commands';
import { Command } from '../../core/models/command';

export class RecordingArmedCommands implements Commands {
  get(context: any): Command[] {
    return [];
  }
}
