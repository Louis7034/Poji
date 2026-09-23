import { Journal } from "./journal";
import { Personnel } from "./personnel";
import { Dejection } from "./dejection";
import { RappelParent } from "./rappel_parent";
import { ProblemeSante } from "./probleme_sante";
import { Temperature } from "./temperature";

export interface TransmissionSoir {
  id: string;
  depart: string | null;
  arrivee: string | null;
  observation: string | null;
  evenement: string | null;
  besoin: string | null;
  journalId?: string | null;
  auteurId?: string | null;

  journal: Journal;
  auteur: Personnel | null;

  dejections: Dejection[];
  rappelsParents: RappelParent[];
  problemesSante: ProblemeSante[];
  temperatures: Temperature[];
}