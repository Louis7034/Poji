import { Personnel } from "./personnel";
import { Enfant } from "./enfant";

export interface Presence {
  id: string;
  etatPresence: string | null; // ENum: "present" | "absent" | "retard" | null
  datePresence: Date;
  auteur: Personnel | null;
  enfant: Enfant;
}