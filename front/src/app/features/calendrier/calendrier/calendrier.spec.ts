import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Calendrier } from './calendrier';
import { EnfantsService } from '../../../services/enfants/enfants.service';
import { PresenceService } from '../../../services/presence/presence.service';

describe('Calendrier', () => {
  let component: Calendrier;
  let fixture: ComponentFixture<Calendrier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calendrier],
      providers: [
        { provide: EnfantsService, useValue: { getEnfants: () => of([]) } },
        { provide: PresenceService, useValue: { getAll: () => of([]) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Calendrier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
