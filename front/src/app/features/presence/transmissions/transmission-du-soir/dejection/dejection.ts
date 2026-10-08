import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { Dejection as DejectionModel } from '../../../../../models/dejection';
import { DejectionService } from '../../../../../services/presence/dejection.service';

@Component({
  selector: 'app-dejection',
  imports: [],
  templateUrl: './dejection.html',
  styleUrl: './dejection.css',
})
export class Dejection implements OnChanges {
  @Input({ required: true }) enfantId!: string;
  @Input() refresh = 0;
  readonly dejections = signal<DejectionModel[]>([]);
  readonly erreur = signal('');

  constructor(private readonly dejectionService: DejectionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enfantId'] || changes['refresh']) {
      this.chargerDejections();
    }
  }

  private chargerDejections(): void {
    if (!this.enfantId) return;

    this.dejectionService.getForEnfant(this.enfantId).subscribe({
      next: (dejections) => {
        this.dejections.set(dejections);
        this.erreur.set('');
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des déjections', error);
        this.erreur.set('Impossible de charger les déjections.');
      },
    });
  }
}
