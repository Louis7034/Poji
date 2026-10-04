import { ActivatedRoute } from '@angular/router';
import { Directive, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Achievement } from '../../../models/achievement';
import {
  AchievementObservation,
  AchievementObservateur,
  AchievementObservationGenerale,
  REPONSES_PAR_CATEGORIE,
} from '../../../models/achievement-observation';
import { AchievementService } from '../../../services/achievement/achievement.service';

@Directive()
export abstract class AchievementObservationPage implements OnInit {
  readonly achievements = signal<Achievement[]>([]);
  readonly erreur = signal(false);
  readonly observations = signal<AchievementObservation[]>([]);
  readonly observateurs = signal<AchievementObservateur[]>([]);
  readonly observationGenerale = signal<AchievementObservationGenerale | null>(null);
  readonly observationGeneraleEnCours = signal('');
  protected readonly route = inject(ActivatedRoute, { optional: true });
  protected readonly achievementService = inject(AchievementService);
  abstract readonly categorie: string;
  private enfantId: string | null = null;
  private readonly observationGeneraleSaves = new Subject<string>();

  constructor() {
    this.observationGeneraleSaves
      .pipe(
        concatMap((observation) =>
          this.achievementService.saveObservationGenerale({
            enfantId: this.enfantId!,
            categorie: this.categorie,
            observation,
          }),
        ),
      )
      .subscribe({
        next: (observation) => this.observationGenerale.set(observation),
        error: () => this.erreur.set(true),
      });
  }

  get reponsesParAchievement(): readonly (readonly string[])[] {
    return REPONSES_PAR_CATEGORIE[this.categorie] ?? [];
  }

  ngOnInit(): void {
    this.enfantId = this.route?.snapshot.queryParamMap.get('enfantId') ?? null;
    if (!this.enfantId) {
      this.erreur.set(true);
      return;
    }

    forkJoin({
      achievements: this.achievementService.getByCategorie(this.categorie),
      observations: this.achievementService.getObservationsByEnfant(this.enfantId),
      observateurs: this.achievementService.getObservateurs(),
      observationGenerale: this.achievementService.getObservationGenerale(
        this.enfantId,
        this.categorie,
      ),
    }).subscribe({
      next: ({ achievements, observations, observateurs, observationGenerale }) => {
        this.achievements.set(achievements);
        this.observations.set(observations);
        this.observateurs.set(observateurs);
        this.observationGenerale.set(observationGenerale);
        this.observationGeneraleEnCours.set(observationGenerale?.observation ?? '');
      },
      error: () => this.erreur.set(true),
    });
  }

  sauvegarderObservationGenerale(observation: string): void {
    if (!this.enfantId) {
      this.erreur.set(true);
      return;
    }

    this.observationGeneraleEnCours.set(observation);
    this.observationGeneraleSaves.next(observation);
  }

  estSelectionnee(achievementId: string, type: string, index: number): boolean {
    const observation = this.observationPour(achievementId);
    if (type === 'professionnels') {
      return Number(observation?.professionnelResponse) === index + 1;
    }

    const observateur = this.observateurPour(type);
    return observateur !== undefined && Number(observation?.reponse) === index + 1;
  }

  selectionner(
    achievementId: string,
    type: string,
    index: number,
    event: Event,
  ): void {
    if (!(event.target as HTMLInputElement).checked || !this.enfantId) {
      return;
    }

    const observateur = this.observateurPour(type);
    if (!observateur && type !== 'professionnels') {
      this.erreur.set(true);
      return;
    }

    const reponse = index + 1;
    const existing = this.observationPour(achievementId);
    const data = type === 'professionnels'
      ? { professionnelResponse: reponse }
      : { reponse };
    const request = existing
      ? this.achievementService.updateObservation(existing.id, data)
      : this.achievementService.createObservation({
          enfantId: this.enfantId,
          achievementId,
          observateurId: observateur?.id ?? '',
          reponse: type === 'professionnels' ? 0 : reponse,
          ...(type === 'professionnels'
            ? { professionnelResponse: reponse }
            : {}),
        });

    console.log('[Achievement] Case cochée', {
      enfantId: this.enfantId,
      achievementId,
      observateur: type,
      observateurId: observateur?.id ?? null,
      reponse,
      professionnelResponse: type === 'professionnels' ? reponse : null,
      observationId: existing?.id ?? null,
      action: existing ? 'mise à jour' : 'création',
    });

    request.subscribe({
      next: (observation) => {
        console.log('[Achievement] Réponse reçue du serveur', observation);
        this.observations.update((current) =>
          existing
            ? current.map((item) => (item.id === existing.id ? observation : item))
            : [...current, observation],
        );
      },
      error: (error) => {
        console.error('[Achievement] Erreur lors de la sauvegarde', error);
        this.erreur.set(true);
      },
    });
  }

  private observationPour(achievementId: string): AchievementObservation | undefined {
    return this.observations().find((item) => item.achievementId === achievementId);
  }

  private observateurPour(type: string): AchievementObservateur | undefined {
    const normalizedType = type.toLowerCase();
    return this.observateurs().find((observateur) => {
      const normalized = observateur.type.toLowerCase();
      return normalized.includes(normalizedType.slice(0, -1));
    });
  }
}
