import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEtatPresence } from './select-etat-presence';

describe('SelectEtatPresence', () => {
  let component: SelectEtatPresence;
  let fixture: ComponentFixture<SelectEtatPresence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectEtatPresence],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectEtatPresence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
