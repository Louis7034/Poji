import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalPanel } from './journal-panel';

describe('JournalPanel', () => {
  let component: JournalPanel;
  let fixture: ComponentFixture<JournalPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(JournalPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
