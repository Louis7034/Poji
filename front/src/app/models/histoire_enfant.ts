export interface HistoireEnfant {
  id: string;
  annee: number | null;
  histoire: string | null;
  date_creation: string;
  date_modification: string | null;
  auteur_id: string | null;
  enfant_id: string;
}
