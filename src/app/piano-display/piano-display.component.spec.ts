import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoDisplayComponent } from './piano-display.component';

describe('PianoDisplayComponent', () => {
  let component: PianoDisplayComponent;
  let fixture: ComponentFixture<PianoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PianoDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
