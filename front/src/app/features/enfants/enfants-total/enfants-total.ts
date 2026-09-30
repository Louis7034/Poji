import { Component, OnInit, signal } from '@angular/core';
import { Enfant } from '../../../models/enfant';
import { EnfantsService } from '../../../services/enfants/enfants.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ModalPetiteHistoire } from '../modal-petite-histoire/modal-petite-histoire';
import { AchievementList } from '../achievement/achievement-list/achievement-list';

@Component({
  selector: 'app-enfants-total',
  imports: [RouterLink, RouterLinkActive, ModalPetiteHistoire, AchievementList],
  templateUrl: './enfants-total.html',
  styleUrl: './enfants-total.css',
})
export class EnfantsTotal implements OnInit {
  constructor(
    private readonly enfantsService: EnfantsService,
    private readonly router: Router,
  ) {}

  readonly enfantsSignal = signal<Enfant[]>([]);
  readonly enfantHistoireSelectionne = signal<Enfant | null>(null);
  readonly enfantAchievementSelectionne = signal<Enfant | null>(null);

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

  afficherAchievements(enfant: Enfant): void {
    this.enfantAchievementSelectionne.set(enfant);
  }

  fermerAchievements(): void {
    this.enfantAchievementSelectionne.set(null);
  }

  ouvrirJournal(enfant: Enfant): void {
    this.router.navigate(['/journal', enfant.id]);
  }
}
