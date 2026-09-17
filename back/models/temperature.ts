import { Personnel } from "./personnel";
import { TransmissionSoir } from "./transmission_soir";
import { ProblemeSante } from "./probleme_sante";

export interface Temperature {
  id: string;
  heure: string | null;
  temperature: number | null;
  auteur: Personnel | null;
  transmissionSoir: TransmissionSoir | null;
  problemeSante: ProblemeSante | null;
}