import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DejectionCreation } from './dejection-creation';

describe('DejectionCreation', () => {
  let component: DejectionCreation;
  let fixture: ComponentFixture<DejectionCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DejectionCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(DejectionCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
