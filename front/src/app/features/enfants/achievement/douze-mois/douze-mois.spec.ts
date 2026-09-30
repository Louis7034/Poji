import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DouzeMois } from './douze-mois';

describe('DouzeMois', () => {
  let component: DouzeMois;
  let fixture: ComponentFixture<DouzeMois>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DouzeMois],
    }).compileComponents();

    fixture = TestBed.createComponent(DouzeMois);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
