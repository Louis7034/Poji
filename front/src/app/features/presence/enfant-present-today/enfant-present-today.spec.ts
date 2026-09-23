import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantPresent } from './enfant-present-today';

describe('EnfantPresent', () => {
  let component: EnfantPresent;
  let fixture: ComponentFixture<EnfantPresent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnfantPresent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnfantPresent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
