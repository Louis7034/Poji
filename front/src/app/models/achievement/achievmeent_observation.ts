export interface AchievementObservation {
  id: string;
  enfantId: string;
  achievementId: string;
  observateurId: string;
  reponse: number | string;
  professionnelResponse?: number | string | null;
  dateObservation: string;
}
