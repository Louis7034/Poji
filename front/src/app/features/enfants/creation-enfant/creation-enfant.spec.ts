import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationEnfant } from './creation-enfant';

describe('CreationEnfant', () => {
  let component: CreationEnfant;
  let fixture: ComponentFixture<CreationEnfant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationEnfant],
    }).compileComponents();

    fixture = TestBed.createComponent(CreationEnfant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
