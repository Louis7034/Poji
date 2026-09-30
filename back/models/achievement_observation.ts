import {Enfant} from "./enfant";
import {Achievement} from "./achievement";
import {AchievementObservateur} from "./achievement_observateur";

export interface AchievementObservation {
    id: string;
    enfantId: Enfant;
    AchievementId: Achievement;
    observateurId: AchievementObservateur;
    reponse: number;
    dateObservation: Date;
}