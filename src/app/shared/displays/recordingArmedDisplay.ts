import {Display} from './display';

export class RecordingArmedDisplay extends Display {
  render(ctx: any): string[] {
    return [
      'Recording armed...',
      'Be ready!'
    ];
  }
}
