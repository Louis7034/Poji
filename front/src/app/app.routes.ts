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
import { SixMois } from './features/enfants/achievement/six-mois/six-mois';
import { DouzeMois } from './features/enfants/achievement/douze-mois/douze-mois';
import { DixHuitMois } from './features/enfants/achievement/dix-huit-mois/dix-huit-mois';
import { VingtQuatreMois } from './features/enfants/achievement/vingt-quatre-mois/vingt-quatre-mois';
import { TrenteSixMois } from './features/enfants/achievement/trente-six-mois/trente-six-mois';

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
    path: 'enfant/six-mois',
    component: SixMois,
  },
  {
    path: 'enfant/douze-mois',
    component: DouzeMois,
  },
  {
    path: 'enfant/dix-huit-mois',
    component: DixHuitMois,
  },
  {
    path: 'enfant/vingt-quatre-mois',
    component: VingtQuatreMois,
  },
  {
    path: 'enfant/trente-six-mois',
    component: TrenteSixMois,
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
