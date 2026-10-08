import { Component } from '@angular/core';
import { AchievementObservationPage } from '../achievement-observation-page';
import { BackButton } from '../../../navigation/back-button/back-button';

@Component({
  selector: 'app-douze-mois',
  imports: [BackButton],
  templateUrl: './douze-mois.html',
  styleUrl: './douze-mois.css',
})
export class DouzeMois extends AchievementObservationPage {
  readonly categorie = '12 mois';
}
