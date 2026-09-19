import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentAujourdhui } from './present-aujourdhui';

describe('PresentAujourdhui', () => {
  let component: PresentAujourdhui;
  let fixture: ComponentFixture<PresentAujourdhui>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentAujourdhui],
    }).compileComponents();

    fixture = TestBed.createComponent(PresentAujourdhui);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
