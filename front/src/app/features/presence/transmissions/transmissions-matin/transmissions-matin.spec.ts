import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionsMatin } from './transmissions-matin';

describe('TransmissionsMatin', () => {
  let component: TransmissionsMatin;
  let fixture: ComponentFixture<TransmissionsMatin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionsMatin],
    }).compileComponents();

    fixture = TestBed.createComponent(TransmissionsMatin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
