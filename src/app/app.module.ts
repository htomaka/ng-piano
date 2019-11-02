import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PianoComponent} from './piano/piano.component';
import {PianoKeyboardComponent} from './piano-keyboard/piano-keyboard.component';
import {PianoDisplayComponent} from './piano-display/piano-display.component';
import {PianoControlsComponent} from './piano-controls/piano-controls.component';
import {PianoTransportComponent} from './piano-transport/piano-transport.component';
import {PianoKeyComponent} from './piano-keyboard/piano-key/piano-key.component';
import {InstrumentService} from './core/instrument.service';
import {BufferService} from './core/buffer.service';
import {HttpClientModule} from '@angular/common/http';
import {MidiService} from './core/midi.service';
import {KeyboardService} from './core/keyboard.service';
import {FormsModule} from '@angular/forms';
import {DisplayDirective} from './shared/displays/display.directive';
import {IdleDisplayComponent} from './shared/displays/idleDisplay.component';
import {LoadingSongDisplayComponent} from './shared/displays/loadingSongDisplay.component';
import {PlayingSongDisplayComponent} from './shared/displays/playingSongDisplay.component';
import {RecordingArmedDisplayComponent} from './shared/displays/recordingArmedDisplay.component';
import {RecordingSongDisplayComponent} from './shared/displays/recordingSongDisplay.component';
import {SavingSongDisplayComponent} from './shared/displays/savingSongDisplay.component';

@NgModule({
  declarations: [
    AppComponent,
    PianoComponent,
    PianoKeyboardComponent,
    PianoDisplayComponent,
    PianoControlsComponent,
    PianoTransportComponent,
    PianoKeyComponent,
    DisplayDirective,
    IdleDisplayComponent,
    LoadingSongDisplayComponent,
    PlayingSongDisplayComponent,
    RecordingArmedDisplayComponent,
    RecordingSongDisplayComponent,
    LoadingSongDisplayComponent,
    SavingSongDisplayComponent
  ],
  entryComponents: [
    IdleDisplayComponent,
    LoadingSongDisplayComponent,
    PlayingSongDisplayComponent,
    RecordingArmedDisplayComponent,
    RecordingSongDisplayComponent,
    LoadingSongDisplayComponent,
    SavingSongDisplayComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [InstrumentService, BufferService, MidiService, KeyboardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
