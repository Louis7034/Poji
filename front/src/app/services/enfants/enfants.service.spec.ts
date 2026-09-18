import { TestBed } from '@angular/core/testing';

import { EnfantsService } from './enfants.service';

describe('EnfantsService', () => {
  let service: EnfantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnfantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
