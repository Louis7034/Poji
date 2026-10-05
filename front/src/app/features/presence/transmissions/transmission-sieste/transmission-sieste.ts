import { Component, Input, OnChanges, OnDestroy, SimpleChanges, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Sieste } from '../../../../models/sieste';
import { PresenceService } from '../../../../services/presence/presence.service';

@Component({
  selector: 'app-transmission-sieste',
  imports: [FormsModule],
  templateUrl: './transmission-sieste.html',
  styleUrl: './transmission-sieste.css',
})
export class TransmissionSieste implements OnChanges, OnDestroy {
  @Input({ required: true }) enfantId!: string;
  readonly siestes = signal<Sieste[]>([]);
  readonly heureDebut = signal('');
  readonly heureFin = signal('');
  readonly observation = signal('');
  readonly etat = signal<'en cours' | 'enregistre' | 'erreur' | null>(null);
  private subscription?: Subscription;

  constructor(private readonly presenceService: PresenceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['enfantId'] || !this.enfantId) return;
    this.etat.set(null);
    this.chargerSiestes();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  creerSieste(): void {
    if (!this.heureDebut() || !this.heureFin()) return;

    this.etat.set('en cours');
    this.presenceService.createSieste({
      enfantId: this.enfantId,
      heureDebut: this.heureDebut(),
      heureFin: this.heureFin(),
      observation: this.observation() || null,
    }).subscribe({
      next: () => {
        this.heureDebut.set('');
        this.heureFin.set('');
        this.observation.set('');
        this.etat.set('enregistre');
        this.chargerSiestes();
      },
      error: (error) => {
        console.error('Erreur lors de la création de la sieste', error);
        this.etat.set('erreur');
      },
    });
  }

  supprimerSieste(id: string): void {
    this.presenceService.deleteSieste(id).subscribe({
      next: () => this.siesteSupprimee(id),
      error: (error) => console.error('Erreur lors de la suppression de la sieste', error),
    });
  }

  private chargerSiestes(): void {
    this.siestes.set([]);
    this.subscription?.unsubscribe();
    this.subscription = this.presenceService.getSiestes(this.enfantId).subscribe({
      next: (siestes) => this.siestes.set(siestes),
      error: (error) => console.error('Erreur lors de la récupération des siestes', error),
    });
  }

  private siesteSupprimee(id?: string): void {
    if (id) this.siestes.update((siestes) => siestes.filter((sieste) => sieste.id !== id));
  }
}
