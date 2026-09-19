import { Enfant } from "./enfant";
import { TransmissionMatin } from "./transmission_matin";
import { TransmissionSoir } from "./transmission_soir";

export interface Journal {
  id: string;
  nom: string;
  createdAt: Date;
  enfant: Enfant;
  transmissionsMatin: TransmissionMatin[];
  transmissionsSoir: TransmissionSoir[];
}