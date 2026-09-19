import { Personnel } from "./personnel";
import { TransmissionMatin } from "./transmission_matin";
import { TransmissionSoir } from "./transmission_soir";
import { Temperature } from "./temperature";

export interface ProblemeSante {
  id: string;
  symptome: string | null;
  traitement: string | null;
  observation: string | null;
  temperatures: Temperature[];
  transmissionMatin: TransmissionMatin | null;
  transmissionSoir: TransmissionSoir | null;
  auteur: Personnel | null;
}