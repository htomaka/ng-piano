import {Injectable} from '@angular/core';
import {PlayingSongDisplayComponent} from './playingSongDisplay.component';
import {RecordingArmedDisplayComponent} from './recordingArmedDisplay.component';
import {RecordingSongDisplayComponent} from './recordingSongDisplay.component';
import {SavingSongDisplayComponent} from './savingSongDisplay.component';
import {LoadingSongDisplayComponent} from './loadingSongDisplay.component';
import {IdleDisplayComponent} from './idleDisplay.component';
import {DisplayItem} from './display-item';
import {AppStates} from '../../core/models/states';
import {SequencerService} from '../../core/sequencer.service';
import {LibraryService} from '../../core/library.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(private sequencer: SequencerService, private library: LibraryService) {
  }

  getDisplay(state: AppStates): DisplayItem {
    let nextDisplay;
    switch (state) {
      case AppStates.SEQUENCER_PLAYING:
        nextDisplay = new DisplayItem(PlayingSongDisplayComponent, {activeSong: this.sequencer.activeTrack}, null);
        break;
      case AppStates.SEQUENCER_RECORDING_ARMED:
        nextDisplay = new DisplayItem(RecordingArmedDisplayComponent, null, null);
        break;
      case AppStates.SEQUENCER_RECORDING:
        nextDisplay = new DisplayItem(RecordingSongDisplayComponent, null, null);
        break;
      case AppStates.LIBRARY_SAVING_SONG:
        nextDisplay = new DisplayItem(SavingSongDisplayComponent, {activeSong: this.sequencer.activeTrack}, {
          onChangeTitle: (title) => {
            if (this.sequencer.activeTrack) {
              this.sequencer.activeTrack.setTitle(title);
            }
          }
        });
        break;
      case AppStates.LIBRARY_LOADING_SONG:
        nextDisplay = new DisplayItem(LoadingSongDisplayComponent, {activeSong$: this.library.activeTrack$}, null);
        break;
      default:
        nextDisplay = new DisplayItem(IdleDisplayComponent, {activeInstrument: 'M1 Piano', activeSong: this.sequencer.activeTrack}, null);
    }

    return nextDisplay;
  }
}
