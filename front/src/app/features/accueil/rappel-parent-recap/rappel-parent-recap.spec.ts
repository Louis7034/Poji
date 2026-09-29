import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappelParentRecap } from './rappel-parent-recap';

describe('RappelParentRecap', () => {
  let component: RappelParentRecap;
  let fixture: ComponentFixture<RappelParentRecap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RappelParentRecap],
    }).compileComponents();

    fixture = TestBed.createComponent(RappelParentRecap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
