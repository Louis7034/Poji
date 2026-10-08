import { Component } from '@angular/core';
import { AchievementObservationPage } from '../achievement-observation-page';
import { BackButton } from '../../../navigation/back-button/back-button';

@Component({
  selector: 'app-six-mois',
  imports: [BackButton],
  templateUrl: './six-mois.html',
  styleUrl: './six-mois.css',
})
export class SixMois extends AchievementObservationPage {
  readonly categorie = '6 mois';
}
