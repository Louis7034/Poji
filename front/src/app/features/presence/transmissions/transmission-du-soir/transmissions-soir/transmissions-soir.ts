import { Component, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransmissionSoir } from '../../../../../models/transmission_soir';
import { PresenceService } from '../../../../../services/presence/presence.service';
import { Dejection } from '../dejection/dejection';
import { DejectionCreation } from '../dejection-creation/dejection-creation';

@Component({
  selector: 'app-transmissions-soir',
  imports: [FormsModule, Dejection, DejectionCreation],
  templateUrl: './transmissions-soir.html',
  styleUrl: './transmissions-soir.css',
})
export class TransmissionsSoir implements OnInit {
  @Input({ required: true }) enfantId!: string;
  readonly transmissions = signal<TransmissionSoir[]>([]);
  readonly sauvegarde = signal<{ id: string; etat: 'en cours' | 'enregistre' | 'erreur' } | null>(null);
  readonly dejectionsRefresh = signal(0);

  constructor(private readonly presenceService: PresenceService) {}

  ngOnInit(): void {
    this.presenceService.getTransmissionsSoir(this.enfantId).subscribe({
      next: (transmissions) => this.transmissions.set(transmissions),
      error: (error) => console.error('Erreur lors de la récupération des transmissions du soir', error),
    });
  }

  sauvegarder(id: string, champ: 'depart' | 'arrivee' | 'observation' | 'evenement' | 'besoin', valeur: string | null): void {
    this.sauvegarde.set({ id, etat: 'en cours' });
    this.presenceService.updateTransmissionSoir(id, { [champ]: valeur }).subscribe({
      next: () => this.sauvegarde.set({ id, etat: 'enregistre' }),
      error: (error) => {
        console.error('Erreur lors de la sauvegarde de la transmission du soir', error);
        this.sauvegarde.set({ id, etat: 'erreur' });
      },
    });
  }

  actualiserDejections(): void {
    this.dejectionsRefresh.update((value) => value + 1);
  }
}
