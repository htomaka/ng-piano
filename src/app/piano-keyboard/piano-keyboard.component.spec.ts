import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoKeyboardComponent } from './piano-keyboard.component';

describe('PianoKeyboardComponent', () => {
  let component: PianoKeyboardComponent;
  let fixture: ComponentFixture<PianoKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PianoKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
