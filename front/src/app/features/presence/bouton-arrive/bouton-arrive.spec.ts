import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonArrive } from './bouton-arrive';

describe('BoutonArrive', () => {
  let component: BoutonArrive;
  let fixture: ComponentFixture<BoutonArrive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutonArrive],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutonArrive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
