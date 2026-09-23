import { Component, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransmissionMatin } from '../../../../models/transmission_matin';
import { PresenceService } from '../../../../services/presence/presence.service';

@Component({
  selector: 'app-transmissions-matin',
  imports: [FormsModule],
  templateUrl: './transmissions-matin.html',
  styleUrl: './transmissions-matin.css',
})
export class TransmissionsMatin implements OnInit {
  @Input({ required: true }) enfantId!: string;
  readonly transmissions = signal<TransmissionMatin[]>([]);
  readonly sauvegarde = signal<{ id: string; etat: 'en cours' | 'enregistre' | 'erreur' } | null>(null);

  constructor(private readonly presenceService: PresenceService) {}

  ngOnInit(): void {
    this.presenceService.getTransmissionsMatin(this.enfantId).subscribe({
      next: (transmissions) => this.transmissions.set(transmissions),
      error: (error) => console.error('Erreur lors de la récupération des transmissions du matin', error),
    });
  }

  sauvegarder(id: string, champ: 'heureCouche' | 'heureReveille' | 'observation' | 'repas' | 'comportement', valeur: string | null): void {
    this.sauvegarde.set({ id, etat: 'en cours' });
    this.presenceService.updateTransmissionMatin(id, { [champ]: valeur }).subscribe({
      next: () => this.sauvegarde.set({ id, etat: 'enregistre' }),
      error: (error) => {
        console.error('Erreur lors de la sauvegarde de la transmission du matin', error);
        this.sauvegarde.set({ id, etat: 'erreur' });
      },
    });
  }
}
