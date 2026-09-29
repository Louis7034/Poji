import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnfantsService } from '../../../../services/enfants/enfants.service';
import { TransmissionsMatin } from '../transmissions-matin/transmissions-matin';
import { TransmissionsSoir } from '../transmissions-soir/transmissions-soir';
import { TransmissionsSante } from '../transmissions-sante/transmissions-sante';

@Component({
  selector: 'app-transmissions-panel',
  imports: [TransmissionsMatin, TransmissionsSoir, TransmissionsSante],
  templateUrl: './transmissions-panel.html',
  styleUrl: './transmissions-panel.css',
})
export class TransmissionsPanel implements OnInit {
  readonly enfantId = signal('');
  readonly enfantPrenom = signal('');
  readonly onglet = signal<'matin' | 'soir' | 'sante'>('matin');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly enfantsService: EnfantsService,
  ) {}

  ngOnInit(): void {
    const enfantId = this.route.snapshot.paramMap.get('enfantId');
    if (enfantId) {
      this.enfantId.set(enfantId);
      this.enfantsService.getEnfants().subscribe({
        next: (enfants) => {
          const enfant = enfants.find((item) => item.id === enfantId);
          if (enfant) {
            this.enfantPrenom.set(enfant.prenom);
          }
        },
        error: (error) => console.error("Erreur lors de la récupération de l'enfant", error),
      });
    }
  }
}
