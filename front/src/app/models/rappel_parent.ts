import { Personnel } from "./personnel";
import { TransmissionSoir } from "./transmission_soir";

export interface RappelParent {
  id: string;
  message: string | null;
  dateCreation: string | Date;
  prenomEnfant?: string | null;
  journee: TransmissionSoir | null;
  auteur: Personnel | null;
}