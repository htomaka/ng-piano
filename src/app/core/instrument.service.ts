import { Injectable } from '@angular/core';
import { BufferService } from './buffer.service';
import { mergeMap, tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Key } from './models/key';
import { Event } from './models/event';
import { AudioContextService } from './audio-context.service';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  private ctx: AudioContext;
  private buffers: { [key: number]: AudioBuffer } = {};

  constructor(
    private bufferService: BufferService,
    private audioContextService: AudioContextService
  ) {
    this.ctx = audioContextService.getContext();
  }

  load(soundBank: { [key: number]: string }): Observable<AudioBuffer[]> {
    return forkJoin(
      Object.keys(soundBank).map(midi => {
        return this.bufferService
          .load(encodeURIComponent(soundBank[midi]))
          .pipe(
            mergeMap(buffer => fromPromise(this.ctx.decodeAudioData(buffer))),
            tap(buffer => {
              this.buffers[midi] = buffer;
            })
          );
      })
    );
  }

  private trigger(key: Key, when = 0) {
    const source = this.ctx.createBufferSource();
    const midi = key.note.toMidi();
    const difference = this.findClosestPitch(midi);
    const closestNote = midi - difference;
    const playbackRate = this.intervalToFrequencyRatio(difference);
    source.buffer = this.buffers[closestNote];
    source.connect(this.ctx.destination);
    source.playbackRate.value = playbackRate;
    source.start(when);
  }

  private intervalToFrequencyRatio(interval) {
    return Math.pow(2, interval / 12);
  }

  private findClosestPitch(midi) {
    // searches within 8 octaves of the given midi note
    const MAX_INTERVAL = 96;
    let interval = 0;
    while (interval < MAX_INTERVAL) {
      // check above and below
      if (this.buffers[midi + interval]) {
        return -interval;
      } else if (this.buffers[midi - interval]) {
        return interval;
      }
      interval++;
    }
    throw new Error('No available buffers for note: ' + midi);
  }

  public play(key: Key) {
    this.trigger(key);
  }

  public playback(event: Event) {
    this.trigger(event.note, event.startTime);
  }
}
