import { Routes } from '@angular/router';
import { Accueil } from './features/accueil/accueil/accueil';
import { EnfantPresentToday } from './features/presence/enfant-present-today/enfant-present-today';
import { EnfantsTotal } from './features/enfants/enfants-total/enfants-total';
import { Calendrier } from './features/calendrier/calendrier/calendrier';
import { RappelCreation } from './features/rappel_parent/rappel-creation/rappel-creation';
import { TransmissionsPanel } from './features/presence/transmissions/transmissions-panel/transmissions-panel';
import { JournalPanel } from './features/enfants/journal/journal-panel/journal-panel';
import { PersonnelTotal } from './features/personnel/personnel-total/personnel-total';
import { LoginForm } from './features/login/login-form/login-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginForm,
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
    path: 'enfants-present/transmission/:enfantId',
    component: TransmissionsPanel,
  },
  {
    path: 'enfants',
    component: EnfantsTotal,
  },
  {
    path: 'journal/:enfantId',
    component: JournalPanel,
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
    path: 'rappel-parent',
    component: RappelCreation,
  },
  {
    path: 'personnel',
    component: PersonnelTotal,
  },
  {
    path: '**',
    redirectTo: 'accueil',
  },
];
