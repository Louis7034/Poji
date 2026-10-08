import { Component } from '@angular/core';
import { AchievementObservationPage } from '../achievement-observation-page';
import { BackButton } from '../../../navigation/back-button/back-button';

@Component({
  selector: 'app-trente-six-mois',
  imports: [BackButton],
  templateUrl: './trente-six-mois.html',
  styleUrl: './trente-six-mois.css',
})
export class TrenteSixMois extends AchievementObservationPage {
  readonly categorie = '36 mois';
}
