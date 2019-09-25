import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoControlsComponent } from './piano-controls.component';

describe('PianoControlsComponent', () => {
  let component: PianoControlsComponent;
  let fixture: ComponentFixture<PianoControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PianoControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
