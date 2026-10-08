import { Component } from '@angular/core';
import { AchievementObservationPage } from '../achievement-observation-page';
import { BackButton } from '../../../navigation/back-button/back-button';

@Component({
  selector: 'app-vingt-quatre-mois',
  imports: [BackButton],
  templateUrl: './vingt-quatre-mois.html',
  styleUrl: './vingt-quatre-mois.css',
})
export class VingtQuatreMois extends AchievementObservationPage {
  readonly categorie = '24 mois';
}
