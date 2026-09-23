import { Component, OnInit, signal } from '@angular/core';
import { CalendrierPresence } from '../calendrier-presence/calendrier-presence';
import { CalendrierTableau } from '../calendrier-tableau/calendrier-tableau';
import { Enfant } from '../../../models/enfant';
import { EnfantsService } from '../../../services/enfants/enfants.service';
import { PresenceService } from '../../../services/presence/presence.service';
import { PresenceCalendrier } from '../../../models/presence-calendrier';

@Component({
  selector: 'app-calendrier',
  imports: [CalendrierPresence, CalendrierTableau],
  templateUrl: './calendrier.html',
  styleUrl: './calendrier.css',
})
export class Calendrier implements OnInit {
  constructor(
    private readonly enfantsService: EnfantsService,
    private readonly presenceService: PresenceService,
  ) {}

  readonly enfants = signal<Enfant[]>([]);
  readonly presences = signal<PresenceCalendrier[]>([]);
  readonly selectedDate = signal(new Date());

  ngOnInit(): void {
    this.enfantsService.getEnfants().subscribe({
      next: (enfants) => this.enfants.set(enfants),
      error: (error) => console.error('Erreur lors de la récupération des enfants', error),
    });
    this.presenceService.getAll().subscribe({
      next: (presences) => this.presences.set(presences),
      error: (error) => console.error('Erreur lors de la récupération des présences', error),
    });
  }

  presenceChange(presence: PresenceCalendrier): void {
    this.presences.update((presences) => [...presences, presence]);
  }

  presenceRemoved(presenceId: string): void {
    this.presences.update((presences) =>
      presences.filter((presence) => presence.id !== presenceId),
    );
  }
}
