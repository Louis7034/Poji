import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierPresence } from './calendrier-presence';

describe('CalendrierPresence', () => {
  let component: CalendrierPresence;
  let fixture: ComponentFixture<CalendrierPresence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendrierPresence],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendrierPresence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
