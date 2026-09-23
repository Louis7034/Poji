import { Routes } from '@angular/router';
import { Accueil } from './features/accueil/accueil/accueil';
import { EnfantPresentToday } from './features/presence/enfant-present-today/enfant-present-today';
import { EnfantsTotal } from './features/enfants/enfants-total/enfants-total';
import { CalendrierPresence } from './features/calendrier/calendrier-presence/calendrier-presence';

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
    component: CalendrierPresence,
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
    component: EnfantPresentToday,
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
