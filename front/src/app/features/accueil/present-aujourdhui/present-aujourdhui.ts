import { Component, OnInit, signal } from '@angular/core';
import { PresenceService } from '../../../services/presence/presence.service';
import { EnfantPresent } from '../../../models/enfant_present';
import { getPresenceEtatClass, PresenceEtat } from '../../../enum/presence_etat';

@Component({
  selector: 'app-present-aujourdhui',
  imports: [],
  templateUrl: './present-aujourdhui.html',
  styleUrl: './present-aujourdhui.css',
  standalone: true,
})
export class PresentAujourdhui implements OnInit {
  constructor(private readonly presenceService: PresenceService) {}

  readonly enfantPresentTodaySignal = signal<EnfantPresent[]>([]);

  getEtatPresence(etat: string | null): PresenceEtat | null {
    const normalizedEtat = etat?.toLowerCase();

    if (normalizedEtat === 'pas_encore_arrivee') {
      return PresenceEtat.PAS_ENCORE_ARRIVE;
    }

    return Object.values(PresenceEtat).includes(normalizedEtat as PresenceEtat)
      ? (normalizedEtat as PresenceEtat)
      : null;
  }

  getEtatLabel(etat: string | null): string {
    switch (this.getEtatPresence(etat)) {
      case PresenceEtat.PRESENT:
        return 'Présent';
      case PresenceEtat.ABSENT:
        return 'Absent';
      case PresenceEtat.RETARD:
        return 'En retard';
      case PresenceEtat.PAS_ENCORE_ARRIVE:
        return 'Pas encore arrivé';
      case PresenceEtat.QUITTE:
        return 'Rentré';
      default:
        return etat ?? '--';
    }
  }

  getEtatClass(etat: string | null): string {
    return getPresenceEtatClass(this.getEtatPresence(etat));
  }

  ngOnInit() {
    this.presenceService.getEnfantPresentToday().subscribe((enfantPresent: EnfantPresent[]) => {
      this.enfantPresentTodaySignal.set(enfantPresent);
    });
  }
}
