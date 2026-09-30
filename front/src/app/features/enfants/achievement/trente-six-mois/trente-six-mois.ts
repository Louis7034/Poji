import { Component } from '@angular/core';
import { AchievementObservationPage } from '../achievement-observation-page';

@Component({
  selector: 'app-trente-six-mois',
  imports: [],
  templateUrl: './trente-six-mois.html',
  styleUrl: './trente-six-mois.css',
})
export class TrenteSixMois extends AchievementObservationPage {
  readonly categorie = '36 mois';
}
