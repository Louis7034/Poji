import { Presence } from "./presence";
import { Journal } from "./journal";

export interface Enfant {
    id: string;
    prenom: string;
    dateArrive: Date | null;
    createdAt: Date;

    presences: Presence[];
    journaux: Journal[];
}