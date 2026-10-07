import { HistoireEnfant } from './histoire_enfant';

export interface Enfant {
  id: string;
  prenom: string;
  dateArrive: string | null;
  createdAt: string;
  histoire_enfant: HistoireEnfant[];
}
