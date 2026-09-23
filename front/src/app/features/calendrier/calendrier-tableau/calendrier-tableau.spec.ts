import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierTableau } from './calendrier-tableau';

describe('CalendrierTableau', () => {
  let component: CalendrierTableau;
  let fixture: ComponentFixture<CalendrierTableau>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendrierTableau],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendrierTableau);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
