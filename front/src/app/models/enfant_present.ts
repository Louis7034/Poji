export interface EnfantPresent {
  presence_id: string;
  enfant_id: string;
  prenom: string;
  etat_presence: string | null;
  heure_arrivee: string | null;
  heure_depart: string | null;
}
