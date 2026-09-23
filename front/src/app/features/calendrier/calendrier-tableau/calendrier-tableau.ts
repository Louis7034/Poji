import { Component, computed, input, output, signal } from '@angular/core';
import { Enfant } from '../../../models/enfant';
import { PresenceCalendrier } from '../../../models/presence-calendrier';

export interface CalendarDay {
  date: number;
  isoDate: string;
  isCurrentMonth: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-calendrier-tableau',
  imports: [],
  templateUrl: './calendrier-tableau.html',
  styleUrl: './calendrier-tableau.css',
})
export class CalendrierTableau {
  readonly enfants = input<Enfant[]>([]);
  readonly presences = input<PresenceCalendrier[]>([]);
  readonly dateChange = output<Date>();
  readonly displayedMonth = signal(new Date());
  readonly selectedDate = signal(this.toIsoDate(new Date()));

  readonly monthLabel = computed(() =>
    new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
      year: 'numeric',
    }).format(this.displayedMonth()),
  );

  readonly days = computed<CalendarDay[]>(() => {
    const month = this.displayedMonth();
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const today = this.toIsoDate(new Date());
    const calendarDays: CalendarDay[] = [];

    for (let index = 0; index < firstDay; index += 1) {
      calendarDays.push({
        date: 0,
        isoDate: '',
        isCurrentMonth: false,
        isToday: false,
      });
    }

    for (let date = 1; date <= daysInMonth; date += 1) {
      const currentDate = new Date(year, monthIndex, date);
      calendarDays.push({
        date,
        isoDate: this.toIsoDate(currentDate),
        isCurrentMonth: true,
        isToday: this.toIsoDate(currentDate) === today,
      });
    }

    return calendarDays;
  });

  previousMonth(): void {
    this.displayedMonth.update((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1));
  }

  nextMonth(): void {
    this.displayedMonth.update((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }

  selectDay(day: CalendarDay): void {
    if (!day.isCurrentMonth) {
      return;
    }

    this.selectedDate.set(day.isoDate);
    const [year, month, date] = day.isoDate.split('-').map(Number);
    this.dateChange.emit(new Date(year, month - 1, date));
  }

  isSelected(day: CalendarDay): boolean {
    return day.isCurrentMonth && day.isoDate === this.selectedDate();
  }

  getPresenceNames(day: CalendarDay): string[] {
    return this.presences()
      .filter((presence) => presence.datePresence.substring(0, 10) === day.isoDate)
      .map((presence) => this.enfants().find((enfant) => enfant.id === presence.enfantId)?.prenom)
      .filter((prenom): prenom is string => Boolean(prenom));
  }

  private toIsoDate(date: Date): string {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
  }
}
