export enum PresenceEtat {
  PRESENT = 'present',
  ABSENT = 'absent',
  RETARD = 'retard',
  PAS_ENCORE_ARRIVE = 'pas_encore_arrive',
  QUITTE = 'quitte'
}

export function getPresenceEtatClass(etat: PresenceEtat | string | null): string {
  const normalizedEtat = etat?.toLowerCase();
  const baseClass = 'rounded-full px-4 py-2 text-sm font-semibold';

  switch (normalizedEtat) {
    case PresenceEtat.PRESENT:
      return `${baseClass} bg-green-100 text-green-700`;
    case PresenceEtat.ABSENT:
      return `${baseClass} bg-red-100 text-red-700`;
    case PresenceEtat.RETARD:
      return `${baseClass} bg-yellow-100 text-yellow-700`;
    case PresenceEtat.PAS_ENCORE_ARRIVE:
    case 'pas_encore_arrivee':
      return `${baseClass} bg-orange-100 text-orange-700`;
    case PresenceEtat.QUITTE:
      return `${baseClass} bg-violet-100 text-violet-700`;
    default:
      return `${baseClass} bg-slate-100 text-slate-700`;
  }

}

export function getPresenceEtatBackgroundClass(etat: PresenceEtat | string | null): string {
  const normalizedEtat = etat?.toLowerCase();

  switch (normalizedEtat) {
    case PresenceEtat.PRESENT:
      return 'bg-green-50';
    case PresenceEtat.ABSENT:
      return 'bg-red-50';
    case PresenceEtat.RETARD:
      return 'bg-yellow-50';
    case PresenceEtat.PAS_ENCORE_ARRIVE:
    case 'pas_encore_arrivee':
      return 'bg-orange-50';
    case PresenceEtat.QUITTE:
      return 'bg-violet-50';
    default:
      return 'bg-slate-50';
  }
}
