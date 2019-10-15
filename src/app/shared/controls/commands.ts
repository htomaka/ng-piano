import {DisplayControl} from '../../core/models/displayControl';

export abstract class Commands {
  public abstract get(context: any): DisplayControl[];
}
