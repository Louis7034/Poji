export interface HistoireEnfantRecue {
    id: string;
    annee: number | null;
    histoire: string | null;
    date_creation: string;
    date_modification: string | null;
    auteur_id: string | null;
    enfant_id: string;
}

export interface Enfant {
    id: string;
    prenom: string;
    dateArrive: string | null;
    createdAt: string;
    histoire_enfant: HistoireEnfantRecue[];
}
