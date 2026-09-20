import { Personnel } from "./personnel";
import { Enfant } from "./enfant";

export interface Presence {
  id: string;
  etatPresence: string | null; // ENum: "present" | "absent" | "retard" | null
  datePresence: Date;
  heure_arrivee: string | null;
  heure_depart: string | null;
  auteur: Personnel | null;
  enfant: Enfant;
}