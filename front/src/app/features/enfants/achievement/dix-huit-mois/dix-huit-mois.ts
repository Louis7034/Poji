import { Component, OnInit, signal } from '@angular/core';
import { Achievement } from '../../../../models/achievement';
import { AchievementService } from '../../../../services/achievement/achievement.service';
import { REPONSES_PAR_CATEGORIE } from '../../../../models/achievement-observation';

@Component({
  selector: 'app-dix-huit-mois',
  imports: [],
  templateUrl: './dix-huit-mois.html',
  styleUrl: './dix-huit-mois.css',
})
export class DixHuitMois implements OnInit {
  readonly achievements = signal<Achievement[]>([]);
  readonly erreur = signal(false);
  readonly reponsesParAchievement = REPONSES_PAR_CATEGORIE['18 mois'];

  constructor(private readonly achievementService: AchievementService) {}

  ngOnInit(): void {
    this.achievementService.getByCategorie('18 mois').subscribe({
      next: (achievements) => this.achievements.set(achievements),
      error: () => this.erreur.set(true),
    });
  }
}
