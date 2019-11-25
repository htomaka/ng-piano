import {AppStates} from './models/appStates';
import {SequencerService} from './sequencer.service';

export type SequencerCommand = {
  [S in AppStates]?: {[key: string]: (args: any) => void}
};

export function sequencerCommands(ctx: SequencerService): SequencerCommand {
  return {
    [AppStates.SEQUENCER_RECORDING_ARMED]: {
      stop: () => ctx.setState(AppStates.SEQUENCER_STOP),
      play: () => {
        ctx.setState(AppStates.SEQUENCER_RECORDING);
      }
    },
    [AppStates.SEQUENCER_PLAYING]: {
      stop: () => ctx.setState(AppStates.SEQUENCER_STOP),
      play: () => {}
    },
    [AppStates.SEQUENCER_STOP]: {
      play: () => {
        if (!ctx.activeTrack) {
          return;
        }
        ctx.setState(AppStates.SEQUENCER_PLAYING);
      },
      stop: () => {}
    },
    [AppStates.SEQUENCER_RECORDING]: {
      stop: () => {
        ctx.save();
      }
    }
  };
}
