import { Component, OnInit, signal } from '@angular/core';
import { Enfant } from '../../../models/enfant';
import { EnfantsService } from '../../../services/enfants/enfants.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalPetiteHistoire } from '../modal-petite-histoire/modal-petite-histoire';

@Component({
  selector: 'app-enfants-total',
  imports: [RouterLink, RouterLinkActive, ModalPetiteHistoire],
  templateUrl: './enfants-total.html',
  styleUrl: './enfants-total.css',
})
export class EnfantsTotal implements OnInit {
  constructor(private readonly enfantsService: EnfantsService) {}

  readonly enfantsSignal = signal<Enfant[]>([]);
  readonly enfantHistoireSelectionne = signal<Enfant | null>(null);

  ngOnInit(): void {
    this.enfantsService.getEnfants().subscribe({
      next: (enfants) => this.enfantsSignal.set(enfants),
      error: (error) => console.error('Erreur lors de la récupération des enfants', error),
    });
  }

  afficherHistoire(enfant: Enfant): void {
    this.enfantHistoireSelectionne.set(enfant);
  }

  fermerHistoire(): void {
    this.enfantHistoireSelectionne.set(null);
  }

}
