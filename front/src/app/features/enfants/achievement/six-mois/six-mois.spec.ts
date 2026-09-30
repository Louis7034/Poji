import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixMois } from './six-mois';

describe('SixMois', () => {
  let component: SixMois;
  let fixture: ComponentFixture<SixMois>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SixMois],
    }).compileComponents();

    fixture = TestBed.createComponent(SixMois);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
