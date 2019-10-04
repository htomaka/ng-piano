import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PianoComponent } from './piano/piano.component';
import { PianoKeyboardComponent } from './piano-keyboard/piano-keyboard.component';
import { PianoDisplayComponent } from './piano-display/piano-display.component';
import { PianoControlsComponent } from './piano-controls/piano-controls.component';
import { PianoTransportComponent } from './piano-transport/piano-transport.component';
import { PianoKeyComponent } from './piano-keyboard/piano-key/piano-key.component';
import {InstrumentService} from './core/instrument.service';
import {BufferService} from './core/buffer.service';
import {HttpClientModule} from '@angular/common/http';
import {TickerService} from './core/ticker.service';

@NgModule({
  declarations: [
    AppComponent,
    PianoComponent,
    PianoKeyboardComponent,
    PianoDisplayComponent,
    PianoControlsComponent,
    PianoTransportComponent,
    PianoKeyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [InstrumentService, BufferService, TickerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
