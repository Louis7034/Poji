import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionSanteCreation } from './transmission-sante-creation';

describe('TransmissionSanteCreation', () => {
  let component: TransmissionSanteCreation;
  let fixture: ComponentFixture<TransmissionSanteCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionSanteCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(TransmissionSanteCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
