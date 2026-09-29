import { Component, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProblemeSante } from '../../../../models/probleme_sante';
import { PresenceService } from '../../../../services/presence/presence.service';

@Component({
  selector: 'app-transmissions-sante',
  imports: [FormsModule],
  templateUrl: './transmissions-sante.html',
})
export class TransmissionsSante implements OnInit {
  @Input({ required: true }) enfantId!: string;
  readonly sante = signal<ProblemeSante | null>(null);
  readonly sauvegarde = signal<'en cours' | 'enregistre' | 'erreur' | null>(null);

  constructor(private readonly presenceService: PresenceService) {}

  ngOnInit(): void {
    this.presenceService.getSanteAujourdHui(this.enfantId).subscribe({
      next: (sante) => this.sante.set(sante),
      error: (error) => console.error('Erreur lors de la récupération des données de santé', error),
    });
  }

  sauvegarder(champ: 'symptome' | 'traitement' | 'observation', valeur: string): void {
    const sante = this.sante();
    if (!sante) return;
    this.sauvegarde.set('en cours');
    this.presenceService.updateSante(sante.id, {
      symptome: sante.symptome,
      traitement: sante.traitement,
      observation: sante.observation,
      [champ]: valeur,
    }).subscribe({
      next: (updated) => {
        this.sante.set(updated);
        this.sauvegarde.set('enregistre');
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde des données de santé', error);
        this.sauvegarde.set('erreur');
      },
    });
  }
}
