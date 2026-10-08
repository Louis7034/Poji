import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProblemeSante } from '../../../../models/probleme_sante';
import { PresenceService } from '../../../../services/presence/presence.service';

@Component({
  selector: 'app-transmission-sante-creation',
  imports: [FormsModule],
  templateUrl: './transmission-sante-creation.html',
  styleUrl: './transmission-sante-creation.css',
})
export class TransmissionSanteCreation {
  @Input({ required: true }) enfantId!: string;
  @Output() readonly created = new EventEmitter<ProblemeSante>();

  symptome = '';
  traitement = '';
  observation = '';
  sauvegarde: 'en cours' | 'enregistre' | 'erreur' | null = null;

  constructor(private readonly presenceService: PresenceService) {}

  creer(): void {
    this.sauvegarde = 'en cours';
    this.presenceService.createSante(this.enfantId, {
      symptome: this.symptome || null,
      traitement: this.traitement || null,
      observation: this.observation || null,
    }).subscribe({
      next: (sante) => {
        this.created.emit(sante);
        this.symptome = '';
        this.traitement = '';
        this.observation = '';
        this.sauvegarde = 'enregistre';
      },
      error: (error) => {
        console.error('Erreur lors de la création des données de santé', error);
        this.sauvegarde = 'erreur';
      },
    });
  }
}
