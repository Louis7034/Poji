import { Personnel } from "./personnel";
import { TransmissionSoir } from "./transmission_soir";

export interface Dejection {
  id: string;
  type: string | null;
  date: Date | null;
  commentaire: string | null;
  auteur: Personnel | null;
  transmissionSoir: TransmissionSoir;
}
