import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappelCreation } from './rappel-creation';

describe('RappelCreation', () => {
  let component: RappelCreation;
  let fixture: ComponentFixture<RappelCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RappelCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(RappelCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
