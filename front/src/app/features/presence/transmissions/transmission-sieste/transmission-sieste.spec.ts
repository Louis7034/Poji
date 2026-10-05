import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionSieste } from './transmission-sieste';

describe('TransmissionSieste', () => {
  let component: TransmissionSieste;
  let fixture: ComponentFixture<TransmissionSieste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionSieste],
    }).compileComponents();

    fixture = TestBed.createComponent(TransmissionSieste);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
