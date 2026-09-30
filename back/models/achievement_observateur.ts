import {Achievement} from "./achievement";

export interface AchievementObservateur {
    id: string;
    type: string;
    createdAt: Date;
    id_achievement: Achievement;
}