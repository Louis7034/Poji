import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Journal } from '../../../../models/journal';
import { JournalService } from '../../../../services/journal/journal.service';

@Component({
  selector: 'app-journal-panel',
  imports: [DatePipe],
  templateUrl: './journal-panel.html',
  styleUrl: './journal-panel.css',
})
export class JournalPanel implements OnInit {
  readonly journals = signal<Journal[]>([]);
  readonly selectedDate = signal('');
  readonly displayedMonth = signal(new Date());
  readonly selectedJournal = signal<Journal | null>(null);

  constructor(private readonly route: ActivatedRoute, private readonly journalService: JournalService) {}

  ngOnInit(): void {
    const enfantId = this.route.snapshot.paramMap.get('enfantId');
    if (!enfantId) return;
    this.journalService.getByEnfant(enfantId).subscribe({
      next: (journals) => {
        this.journals.set(journals);
        if (journals.length) this.selectDate(this.toIsoDate(new Date(journals[0].createdAt)));
      },
      error: (error) => console.error('Erreur lors de la récupération du journal', error),
    });
  }

  days(): { date: number; isoDate: string; currentMonth: boolean }[] {
    const month = this.displayedMonth();
    const first = (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7;
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: first }, () => ({ date: 0, isoDate: '', currentMonth: false }));
    for (let date = 1; date <= count; date++) {
      const current = new Date(month.getFullYear(), month.getMonth(), date);
      days.push({ date, isoDate: this.toIsoDate(current), currentMonth: true });
    }
    return days;
  }

  monthLabel(): string {
    return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(this.displayedMonth());
  }

  selectDate(date: string): void {
    this.selectedDate.set(date);
    this.selectedJournal.set(this.journalFor(date));
  }

  journalFor(date: string): Journal | null {
    return this.journals().find((journal) => this.toIsoDate(new Date(journal.createdAt)) === date) ?? null;
  }

  previousMonth(): void {
    this.displayedMonth.update((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1));
  }

  nextMonth(): void {
    this.displayedMonth.update((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }

  private toIsoDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
}
