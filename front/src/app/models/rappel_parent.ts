import { Personnel } from "./personnel";
import { TransmissionSoir } from "./transmission_soir";

export interface RappelParent {
  id: string;
  message: string | null;
  dateCreation: Date;
  journee: TransmissionSoir | null;
  auteur: Personnel | null;
}