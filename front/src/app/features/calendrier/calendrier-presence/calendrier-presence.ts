import { Component, input, output } from '@angular/core';
import { Enfant } from '../../../models/enfant';
import { PresenceCalendrier } from '../../../models/presence-calendrier';
import { PresenceService } from '../../../services/presence/presence.service';

@Component({
  selector: 'app-calendrier-presence',
  imports: [],
  templateUrl: './calendrier-presence.html',
  styleUrl: './calendrier-presence.css',
})
export class CalendrierPresence {
  constructor(private readonly presenceService: PresenceService) {}

  readonly enfants = input<Enfant[]>([]);
  readonly selectedDate = input<Date>(new Date());
  readonly presences = input<PresenceCalendrier[]>([]);
  readonly presenceChange = output<PresenceCalendrier>();
  readonly presenceRemoved = output<string>();

  togglePresence(enfantId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const datePresence = this.toIsoDate(this.selectedDate());
    const existingPresence = this.presences().find(
      (presence) =>
        presence.enfantId === enfantId && presence.datePresence.substring(0, 10) === datePresence,
    );

    if (checked) {
      if (existingPresence) {
        return;
      }

      this.presenceService.createPresence(enfantId, datePresence).subscribe({
        next: (presence) => this.presenceChange.emit(presence),
        error: (error) => console.error("Erreur lors de l'ajout de la présence", error),
      });
      return;
    }

    if (!existingPresence) {
      return;
    }

    this.presenceService.deletePresence(existingPresence.id).subscribe({
      next: () => this.presenceRemoved.emit(existingPresence.id),
      error: (error) => console.error('Erreur lors de la suppression de la présence', error),
    });
  }

  isChecked(enfantId: string): boolean {
    const selectedDate = this.toIsoDate(this.selectedDate());
    return this.presences().some(
      (presence) =>
        presence.enfantId === enfantId && presence.datePresence.substring(0, 10) === selectedDate,
    );
  }

  formatSelectedDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  private toIsoDate(date: Date): string {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
  }
}
