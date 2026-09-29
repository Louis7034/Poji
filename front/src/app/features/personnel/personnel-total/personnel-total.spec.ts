import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelTotal } from './personnel-total';

describe('PersonnelTotal', () => {
  let component: PersonnelTotal;
  let fixture: ComponentFixture<PersonnelTotal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelTotal],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnelTotal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
