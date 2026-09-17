import { HistoireEnfant } from "./histoire_enfant";
import { Presence } from "./presence";
import { Journal } from "./journal";

export interface Enfant {
    id: string;
    dateArrive: Date | null;
    createdAt: Date;

    histoires: HistoireEnfant[];
    presences: Presence[];
    journaux: Journal[];
}