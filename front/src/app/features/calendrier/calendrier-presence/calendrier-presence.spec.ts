import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CalendrierPresence } from './calendrier-presence';
import { PresenceService } from '../../../services/presence/presence.service';

describe('CalendrierPresence', () => {
  let component: CalendrierPresence;
  let fixture: ComponentFixture<CalendrierPresence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendrierPresence],
      providers: [
        {
          provide: PresenceService,
          useValue: {
            createPresence: () => of({}),
            deletePresence: () => of(undefined),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendrierPresence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
