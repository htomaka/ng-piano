import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoKeyComponent } from './piano-key.component';

describe('PianoKeyComponent', () => {
  let component: PianoKeyComponent;
  let fixture: ComponentFixture<PianoKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PianoKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
