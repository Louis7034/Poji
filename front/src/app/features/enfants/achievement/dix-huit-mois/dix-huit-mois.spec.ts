import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DixHuitMois } from './dix-huit-mois';

describe('DixHuitMois', () => {
  let component: DixHuitMois;
  let fixture: ComponentFixture<DixHuitMois>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DixHuitMois],
    }).compileComponents();

    fixture = TestBed.createComponent(DixHuitMois);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
