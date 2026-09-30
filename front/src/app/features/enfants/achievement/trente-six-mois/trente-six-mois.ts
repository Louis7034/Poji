import { Component, OnInit, signal } from '@angular/core';
import { Achievement } from '../../../../models/achievement';
import { AchievementService } from '../../../../services/achievement/achievement.service';
import { REPONSES_PAR_CATEGORIE } from '../../../../models/achievement-observation';

@Component({
  selector: 'app-trente-six-mois',
  imports: [],
  templateUrl: './trente-six-mois.html',
  styleUrl: './trente-six-mois.css',
})
export class TrenteSixMois implements OnInit {
  readonly achievements = signal<Achievement[]>([]);
  readonly erreur = signal(false);
  readonly reponsesParAchievement = REPONSES_PAR_CATEGORIE['36 mois'];

  constructor(private readonly achievementService: AchievementService) {}

  ngOnInit(): void {
    this.achievementService.getByCategorie('36 mois').subscribe({
      next: (achievements) => this.achievements.set(achievements),
      error: () => this.erreur.set(true),
    });
  }
}
