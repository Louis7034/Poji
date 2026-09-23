import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PresenceService } from '../../../services/presence/presence.service';
import {
  getPresenceEtatBackgroundClass,
  getPresenceEtatClass,
  PresenceEtat,
} from '../../../enum/presence_etat';
import { EnfantPresent } from '../../../models/enfant_present';
import { SelectEtatPresence } from '../select-etat-presence/select-etat-presence';
import { BoutonArrive } from '../bouton-arrive/bouton-arrive';
import { BoutonQuitte } from '../bouton-quitte/bouton-quitte';

@Component({
  selector: 'app-enfant-present-today',
  imports: [SelectEtatPresence, BoutonArrive, BoutonQuitte],
  templateUrl: './enfant-present-today.html',
  styleUrl: './enfant-present-today.css',
  standalone: true,
})
export class EnfantPresentToday {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly router: Router,
  ) {}

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
      default:
        return etat ?? '--';
    }
  }

  getEtatClass(etat: string | null): string {
    return getPresenceEtatClass(this.getEtatPresence(etat));
  }

  getEtatBackgroundClass(etat: string | null): string {
    return getPresenceEtatBackgroundClass(this.getEtatPresence(etat));
  }

  modifierEtat(enfant: EnfantPresent, etat: PresenceEtat): void {
    if (!enfant.presence_id) {
      return;
    }

    const heureDepart =
      etat === PresenceEtat.QUITTE ? new Date().toTimeString().slice(0, 8) : undefined;
    const heureArrivee =
      etat === PresenceEtat.PRESENT
        ? enfant.heure_arrivee ?? new Date().toTimeString().slice(0, 8)
        : etat === PresenceEtat.QUITTE
          ? undefined
          : enfant.heure_arrivee
          ? null
          : undefined;
    const heureDepartMiseAJour =
      enfant.heure_depart && etat !== PresenceEtat.QUITTE
        ? null
        : heureDepart;

    this.presenceService
      .updatePresence(
        enfant.presence_id,
        etat,
        heureArrivee,
        heureDepartMiseAJour,
      )
      .subscribe({
        next: () => {
          this.enfantPresentTodaySignal.update((enfants) =>
            enfants.map((item) =>
              item.enfant_id === enfant.enfant_id
                ? {
                    ...item,
                    etat_presence: etat,
                    heure_arrivee:
                      heureArrivee === undefined ? item.heure_arrivee : heureArrivee,
                    heure_depart:
                      heureDepartMiseAJour === null
                        ? null
                        : heureDepartMiseAJour ?? item.heure_depart,
                  }
                : item,
            ),
          );
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la présence', error);
        },
      });
  }

  marquerCommeQuitte(enfant: EnfantPresent): void {
    if (!enfant.presence_id) {
      return;
    }

    const heureDepart = new Date().toTimeString().slice(0, 8);

    this.presenceService
      .updatePresence(enfant.presence_id, PresenceEtat.QUITTE, undefined, heureDepart)
      .subscribe({
        next: () => {
          this.enfantPresentTodaySignal.update((enfants) =>
            enfants.map((item) =>
              item.enfant_id === enfant.enfant_id
                ? { ...item, etat_presence: PresenceEtat.QUITTE, heure_depart: heureDepart }
                : item,
            ),
          );
        },
        error: (error) => {
          console.error("Erreur lors de l'enregistrement du départ", error);
        },
      });
  }

  marquerCommeArrive(enfant: EnfantPresent): void {
    if (!enfant.presence_id) {
      return;
    }

    const heureArrivee = new Date().toTimeString().slice(0, 8);

    this.presenceService
      .updatePresence(enfant.presence_id, PresenceEtat.PRESENT, heureArrivee)
      .subscribe({
      next: () => {
        this.enfantPresentTodaySignal.update((enfants) =>
          enfants.map((item) =>
            item.enfant_id === enfant.enfant_id
              ? { ...item, etat_presence: PresenceEtat.PRESENT, heure_arrivee: heureArrivee }
              : item,
          ),
        );
      },
      error: (error) => {
        console.error("Erreur lors de l'enregistrement de l'arrivée", error);
      },
      });
  }

  ouvrirTransmissions(enfant: EnfantPresent): void {
    this.router.navigate(['/enfants-present/transmission', enfant.enfant_id]);
  }

  ngOnInit() {
    this.presenceService.getEnfantPresentToday().subscribe((enfantPresent: EnfantPresent[]) => {
      this.enfantPresentTodaySignal.set(enfantPresent);
    });
  }
}
