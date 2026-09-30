import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenteSixMois } from './trente-six-mois';

describe('TrenteSixMois', () => {
  let component: TrenteSixMois;
  let fixture: ComponentFixture<TrenteSixMois>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrenteSixMois],
    }).compileComponents();

    fixture = TestBed.createComponent(TrenteSixMois);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
