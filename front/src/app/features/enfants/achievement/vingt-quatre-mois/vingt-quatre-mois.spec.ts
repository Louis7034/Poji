import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VingtQuatreMois } from './vingt-quatre-mois';

describe('VingtQuatreMois', () => {
  let component: VingtQuatreMois;
  let fixture: ComponentFixture<VingtQuatreMois>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VingtQuatreMois],
    }).compileComponents();

    fixture = TestBed.createComponent(VingtQuatreMois);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
