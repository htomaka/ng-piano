import {Command} from '../../core/models/command';

export abstract class Commands {
  public abstract get(context: any): Command[];
}
