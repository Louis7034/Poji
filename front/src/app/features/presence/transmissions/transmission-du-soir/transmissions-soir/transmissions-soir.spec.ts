import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionsSoir } from './transmissions-soir';

describe('TransmissionsSoir', () => {
  let component: TransmissionsSoir;
  let fixture: ComponentFixture<TransmissionsSoir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionsSoir],
    }).compileComponents();

    fixture = TestBed.createComponent(TransmissionsSoir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
