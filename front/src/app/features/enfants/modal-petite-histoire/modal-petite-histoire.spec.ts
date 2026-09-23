import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPetiteHistoire } from './modal-petite-histoire';

describe('ModalPetiteHistoire', () => {
  let component: ModalPetiteHistoire;
  let fixture: ComponentFixture<ModalPetiteHistoire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPetiteHistoire],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPetiteHistoire);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
