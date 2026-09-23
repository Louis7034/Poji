import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionsPanel } from './transmissions-panel';

describe('TransmissionsPanel', () => {
  let component: TransmissionsPanel;
  let fixture: ComponentFixture<TransmissionsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionsPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(TransmissionsPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
