import { Personnel } from "./personnel";
import { TransmissionSoir } from "./transmission_soir";
import {Enfant} from "./enfant";

export interface RappelParent {
  id: string;
  message: string | null;
  date_creation: Date;
  journee: TransmissionSoir | null;
  auteur: Personnel | null;
  enfantId: Enfant | null;
}