import { Journal } from "./journal";
import { Personnel } from "./personnel";
import { ProblemeSante } from "./probleme-sante";

export interface TransmissionMatin {
  id: string;
  heureCouche: string | null;
  heureReveille: string | null;
  observation: string | null;
  repas: string | null;
  comportement: string | null;
  journal: Journal;
  auteur: Personnel | null;
  problemesSante: ProblemeSante[];
}