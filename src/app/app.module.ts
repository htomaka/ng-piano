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
import { GraphQLModule } from './graphql.module';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

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
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    GraphQLModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    InstrumentService,
    BufferService,
    MidiService,
    KeyboardService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4000/'
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
