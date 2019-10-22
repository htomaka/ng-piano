import { Command } from '../../core/models/command';

export interface Commands {
  get(context: any): Command[];
}
