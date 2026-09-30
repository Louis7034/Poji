import { Component, OnInit, signal } from '@angular/core';
import { Achievement } from '../../../../models/achievement';
import { AchievementService } from '../../../../services/achievement/achievement.service';
import { REPONSES_PAR_CATEGORIE } from '../../../../models/achievement-observation';

@Component({
  selector: 'app-six-mois',
  imports: [],
  templateUrl: './six-mois.html',
  styleUrl: './six-mois.css',
})
export class SixMois implements OnInit {
  readonly achievements = signal<Achievement[]>([]);
  readonly erreur = signal(false);
  readonly reponsesParAchievement = REPONSES_PAR_CATEGORIE['6 mois'];

  constructor(private readonly achievementService: AchievementService) {}

  ngOnInit(): void {
    this.achievementService.getByCategorie('6 mois').subscribe({
      next: (achievements) => this.achievements.set(achievements),
      error: () => this.erreur.set(true),
    });
  }
}
