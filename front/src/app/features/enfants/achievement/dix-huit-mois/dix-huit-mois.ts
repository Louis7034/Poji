import { Component } from '@angular/core';
import { AchievementObservationPage } from '../achievement-observation-page';
import { BackButton } from '../../../navigation/back-button/back-button';

@Component({
  selector: 'app-dix-huit-mois',
  imports: [BackButton],
  templateUrl: './dix-huit-mois.html',
  styleUrl: './dix-huit-mois.css',
})
export class DixHuitMois extends AchievementObservationPage {
  readonly categorie = '18 mois';
}
