import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonQuitte } from './bouton-quitte';

describe('BoutonQuitte', () => {
  let component: BoutonQuitte;
  let fixture: ComponentFixture<BoutonQuitte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutonQuitte],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutonQuitte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
