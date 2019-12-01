import {EventEmitter} from '@angular/core';

export class Ticker extends EventEmitter<number> {
  private position = 0;
  private tickDuration = 25;
  private id;
  private ctx: AudioContext;

  constructor(ctx: AudioContext) {
    super();
    this.ctx = ctx;
  }

  start() {
    if (!this.id) {
      this.tick();
    }
  }

  stop() {
    clearTimeout(this.id);
    this.id = null;
  }

  setTickDuration(duration: number) {
    this.tickDuration = Math.floor(duration);
  }

  getTime() {
    return this.ctx.currentTime * 1000;
  }

  private tick() {
    if (!this.position) {
      this.position = this.getTime();
    }
    this.position += this.tickDuration;
    const diff = this.position - this.getTime();
    this.id = setTimeout(this.tick.bind(this), diff);
    this.emit(this.position);
  }
}
