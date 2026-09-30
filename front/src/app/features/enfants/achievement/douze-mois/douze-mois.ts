import { Component, OnInit, signal } from '@angular/core';
import { Achievement } from '../../../../models/achievement';
import { AchievementService } from '../../../../services/achievement/achievement.service';
import { REPONSES_PAR_CATEGORIE } from '../../../../models/achievement-observation';

@Component({
  selector: 'app-douze-mois',
  imports: [],
  templateUrl: './douze-mois.html',
  styleUrl: './douze-mois.css',
})
export class DouzeMois implements OnInit {
  readonly achievements = signal<Achievement[]>([]);
  readonly erreur = signal(false);
  readonly reponsesParAchievement = REPONSES_PAR_CATEGORIE['12 mois'];

  constructor(private readonly achievementService: AchievementService) {}

  ngOnInit(): void {
    this.achievementService.getByCategorie('12 mois').subscribe({
      next: (achievements) => this.achievements.set(achievements),
      error: () => this.erreur.set(true),
    });
  }
}
