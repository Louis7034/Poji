import { Personnel } from "./personnel";
import { TransmissionSoir } from "./transmission-soir";

export interface Dejection {
  id: string;
  type: string | null;
  date: Date | null;
  commentaire: string | null;

  auteurId: string | null;
  transmissionSoirId: string;

  auteur: Personnel | null;
  transmissionSoir: TransmissionSoir;
}