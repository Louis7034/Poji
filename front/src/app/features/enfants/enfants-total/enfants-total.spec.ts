import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EnfantsTotal } from './enfants-total';
import { EnfantsService } from '../../../services/enfants/enfants.service';

describe('EnfantsTotal', () => {
  let component: EnfantsTotal;
  let fixture: ComponentFixture<EnfantsTotal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnfantsTotal],
      providers: [
        {
          provide: EnfantsService,
          useValue: { getEnfants: () => of([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EnfantsTotal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
