import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Command } from '../../core/models/command';
import { PlayingSongsCommands } from './playingSongsCommands';
import { RecordingArmedCommands } from './recordingArmedCommands';
import { RecordingSongCommands } from './recordingSongCommands';
import { SavingSongCommands } from './savingSongCommands';
import { LoadingSongCommands } from './loadingSongCommands';
import { IdleCommands } from './idleCommands';
import {AppStates} from '../../core/models/states';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  private commandsSubject = new ReplaySubject<Command[]>(1);
  public commands$ = this.commandsSubject.asObservable();

  constructor() {}

  get(ctx, state) {
    let nextControls = [];
    switch (state) {
      case AppStates.SEQUENCER_PLAYING:
        nextControls = new PlayingSongsCommands().get(ctx);
        break;
      case AppStates.SEQUENCER_RECORDING_ARMED:
        nextControls = new RecordingArmedCommands().get(ctx);
        break;
      case AppStates.SEQUENCER_RECORDING:
        nextControls = new RecordingSongCommands().get(ctx);
        break;
      case AppStates.LIBRARY_SAVING_SONG:
        nextControls = new SavingSongCommands().get(ctx);
        break;
      case AppStates.LIBRARY_LOADING_SONG:
        nextControls = new LoadingSongCommands().get(ctx);
        break;
      default:
        nextControls = new IdleCommands().get(ctx);
    }

    this.commandsSubject.next(nextControls);
  }
}
