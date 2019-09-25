import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoTransportComponent } from './piano-transport.component';

describe('PianoTransportComponent', () => {
  let component: PianoTransportComponent;
  let fixture: ComponentFixture<PianoTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PianoTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
