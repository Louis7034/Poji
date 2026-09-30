import { Component } from '@angular/core';
import { AchievementObservationPage } from '../achievement-observation-page';

@Component({
  selector: 'app-douze-mois',
  imports: [],
  templateUrl: './douze-mois.html',
  styleUrl: './douze-mois.css',
})
export class DouzeMois extends AchievementObservationPage {
  readonly categorie = '12 mois';
}
