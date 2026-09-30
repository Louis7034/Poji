import { Component } from '@angular/core';
import { AchievementObservationPage } from '../achievement-observation-page';

@Component({
  selector: 'app-dix-huit-mois',
  imports: [],
  templateUrl: './dix-huit-mois.html',
  styleUrl: './dix-huit-mois.css',
})
export class DixHuitMois extends AchievementObservationPage {
  readonly categorie = '18 mois';
}
