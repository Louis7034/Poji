import { Personnel } from "./personnel";
import { Enfant } from "./enfant";

export interface HistoireEnfant {
  id: string;
  annee: number | null;
  histoire: string | null;
  dateCreation: Date;
  dateModification: Date | null;
  auteur: Personnel | null;
  enfant: Enfant;
}