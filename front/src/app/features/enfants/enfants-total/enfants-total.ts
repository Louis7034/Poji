import { Component, OnInit, signal } from '@angular/core';
import { Enfant } from '../../../models/enfant';
import { EnfantsService } from '../../../services/enfants/enfants.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AchievementList } from '../achievement/achievement-list/achievement-list';
import { CreationEnfant } from '../creation-enfant/creation-enfant';

@Component({
  selector: 'app-enfants-total',
  imports: [RouterLink, RouterLinkActive, AchievementList, CreationEnfant],
  templateUrl: './enfants-total.html',
  styleUrl: './enfants-total.css',
})
export class EnfantsTotal implements OnInit {
  constructor(
    private readonly enfantsService: EnfantsService,
    private readonly router: Router,
  ) {}

  readonly enfantsSignal = signal<Enfant[]>([]);
  readonly enfantAchievementSelectionne = signal<Enfant | null>(null);
  permDirecteur:boolean = false;
  ngOnInit(): void {
    this.enfantsService.getEnfants().subscribe({
      next: (enfants) => this.enfantsSignal.set(enfants),
      error: (error) => console.error('Erreur lors de la récupération des enfants', error),
    });
    this.checkPermDirecteur();
  }

  afficherAchievements(enfant: Enfant): void {
    this.enfantAchievementSelectionne.set(enfant);
  }

  ouvrirJournal(enfant: Enfant): void {
    this.router.navigate(['/journal', enfant.id]);
  }

  fermerAchievements(): void {
    this.enfantAchievementSelectionne.set(null);
  }

  ajouterEnfant(enfant: Enfant): void {
    this.enfantsSignal.update((enfants) =>
      [...enfants, { ...enfant ?? [] }].sort((a, b) =>
        a.prenom.localeCompare(b.prenom),
      ),
    );
  }

  checkPermDirecteur(): void {
    const user = localStorage.getItem('poji-authenticated-user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === 'DIRECTEUR') {
        this.permDirecteur = true;
      }
    }
  }
}
