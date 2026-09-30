export interface AchievementObservation {
  id: string;
  enfantId: string;
  achievementId: string;
  observateurId: string;
  reponse: number | string;
  professionnelResponse?: number | string | null;
  dateObservation: string;
}

export interface AchievementObservateur {
  id: string;
  type: string;
}

export const REPONSES_PAR_CATEGORIE: Record<string, readonly (readonly string[])[]> = {
  '6 mois': [
    ['Oui', 'Parfois', 'Pas encore'],
    ['Oui', "Oui avec de l'aide", 'Pas encore'],
    ['Oui', 'Parfois', 'Pas encore'],
    ['Oui', 'Toujours', 'Parfois', 'Pas encore'],
    ['Oui', 'Parfois', 'Pas encore'],
    ['Oui', 'Pas encore'],
  ],
  '12 mois': [
    ['Oui', 'Parfois', 'Pas encore'],
    ['Oui', 'Oui mais pas longtemps', 'Pas encore'],
    ['Oui', 'Décrire la façon de faire', 'Pas encore'],
    ['Oui', "Oui mais avec de l'aide", 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui', 'Pas toujours la première fois', 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui', 'Oui, mais pas toujours', 'Pas encore'],
    ['Oui', 'Pas encore'],
  ],
  '18 mois': [
    ["Oui tout le temps", "Oui mais j'ai encore besoin d'aide", 'Pas encore'],
    ["Oui tout le temps", "Oui mais j'ai encore besoin d'aide", 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui', "Oui avec de l'aide", 'Pas encore'],
    ['Oui', 'Parfois', 'Pas encore'],
    ['Oui', "Oui avec de l'aide", 'Pas encore'],
    ['Lesquels', 'Pas encore'],
    ['Oui (comment cela se voit ?)', 'Pas encore'],
    ['Oui', 'Pas encore'],
  ],
  '24 mois': [
    ['Oui', 'Pas encore'],
    ['Oui', "Oui avec de l'aide", 'Pas encore'],
    ['Oui', "Oui avec de l'aide", 'Pas encore'],
    ['Oui', "Oui avec de l'aide", 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui (citer les 10 mots)', 'Preque 10 mots', 'Pas encore'],
    ['Oui', 'Oui mais rarement', 'Pas encore'],
    ["Pas l'occasion", 'Oui', 'Pas encore'],
  ],
  '36 mois': [
    ['En hésitant', 'Avec une aide', "Oui mais avec la même jambe d'appuie", 'Pas encore'],
    ['En hésitant', 'Avec une aide', 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui', 'Avec une aide-pas', 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui', 'Pas encore'],
    ['Oui', 'Pas encore'],
  ],
};
