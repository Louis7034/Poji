import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dejection } from './dejection';

describe('Dejection', () => {
  let component: Dejection;
  let fixture: ComponentFixture<Dejection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dejection],
    }).compileComponents();

    fixture = TestBed.createComponent(Dejection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
