import { Routes } from '@angular/router';
import { Accueil } from './features/accueil/accueil/accueil';
import { EnfantPresentToday } from './features/presence/enfant-present-today/enfant-present-today';
import { EnfantsTotal } from './features/enfants/enfants-total/enfants-total';
import { Calendrier } from './features/calendrier/calendrier/calendrier';
import { RappelCreation } from './features/rappel_parent/rappel-creation/rappel-creation';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  {
    path: 'accueil',
    component: Accueil,
  },
  {
    path: 'enfants-present',
    component: EnfantPresentToday,
  },
  {
    path: 'enfants',
    component: EnfantsTotal,
  },
  {
    path: 'calendrier',
    component: Calendrier,
  },
  {
    path: 'presences',
    component: EnfantPresentToday,
  },
  {
    path: 'sante',
    component: EnfantPresentToday,
  },
  {
    path: 'rappel-parent',
    component: RappelCreation,
  },
  {
    path: 'personnel',
    component: EnfantPresentToday,
  },
  {
    path: '**',
    redirectTo: 'accueil',
  },
];
