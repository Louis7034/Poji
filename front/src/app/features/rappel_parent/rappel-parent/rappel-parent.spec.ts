import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappelParent } from './rappel-parent';

describe('RappelParent', () => {
  let component: RappelParent;
  let fixture: ComponentFixture<RappelParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RappelParent],
    }).compileComponents();

    fixture = TestBed.createComponent(RappelParent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
