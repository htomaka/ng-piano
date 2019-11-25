import {EventEmitter, Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {AudioContextService} from '../audio-context.service';
import {Ticker} from './Ticker';
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private tickLength = 60;
  private position = 0;
  private clock: Ticker;
  private beatsInBar = 4;
  public PPQ = 96;
  public clock$;

  constructor(private audioContext: AudioContextService) {
    this.clock = new Ticker(this.audioContext.getContext());
    this.clock$ = this.clock;
    this.getTicks().pipe(
      tap(this.setPosition.bind(this))
    ).subscribe();
  }

  getTicks() {
    return this.clock$;
  }

  start() {
    this.position = -1;
    this.clock.start();
  }

  stop() {
    this.clock.stop();
  }

  setTempo(tempo) {
    this.tickLength = 60000 / (tempo * this.PPQ);
    this.clock.setTickDuration(this.tickLength);
  }

  setPosition(): void {
    this.position += 1;
  }

  getTick(): number {
    return this.position;
  }

  toTick() {
    return Math.floor(this.getTick() / this.PPQ);
  }

  toBarBeatTick(): { tick: number, beat: number, bar: number } {
    const tick = this.toTick();
    const beat = (tick % this.beatsInBar) + 1;
    const bar = Math.floor(tick / this.beatsInBar);
    return {tick, beat, bar};
  }

}
