import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioContextService {
  private readonly ctx: AudioContext;

  constructor() {
    this.ctx = new AudioContext();
  }

  getContext() {
    return this.ctx;
  }

  getCurrentTime() {
    return this.ctx.currentTime;
  }
}
