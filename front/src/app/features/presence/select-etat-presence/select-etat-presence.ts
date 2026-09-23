import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PresenceEtat } from '../../../enum/presence_etat';

@Component({
  selector: 'app-select-etat-presence',
  imports: [],
  templateUrl: './select-etat-presence.html',
  styleUrl: './select-etat-presence.css',
})
export class SelectEtatPresence {
  private currentEtat: PresenceEtat | null = null;

  @Input()
  set etat(value: PresenceEtat | string | null) {
    const normalizedValue =
      value?.toLowerCase() === 'pas_encore_arrivee'
        ? PresenceEtat.PAS_ENCORE_ARRIVE
        : value?.toLowerCase();
    this.currentEtat = Object.values(PresenceEtat).includes(normalizedValue as PresenceEtat)
      ? (normalizedValue as PresenceEtat)
      : null;
  }

  get etat(): PresenceEtat | null {
    return this.currentEtat;
  }

  @Input() selectId = 'etat-presence';
  @Output() readonly etatChange = new EventEmitter<PresenceEtat>();

  readonly options = [
    { value: PresenceEtat.PRESENT, label: 'Présent' },
    { value: PresenceEtat.ABSENT, label: 'Absent' },
    { value: PresenceEtat.RETARD, label: 'En retard' },
    { value: PresenceEtat.PAS_ENCORE_ARRIVE, label: 'Pas encore arrivé' },
    { value: PresenceEtat.QUITTE, label: 'Quitté' },
  ];

  onChange(value: string): void {
    if (Object.values(PresenceEtat).includes(value as PresenceEtat)) {
      this.etatChange.emit(value as PresenceEtat);
    }
  }

}
