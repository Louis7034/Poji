import { Component } from '@angular/core';
import { AchievementObservationPage } from '../achievement-observation-page';

@Component({
  selector: 'app-six-mois',
  imports: [],
  templateUrl: './six-mois.html',
  styleUrl: './six-mois.css',
})
export class SixMois extends AchievementObservationPage {
  readonly categorie = '6 mois';
}
