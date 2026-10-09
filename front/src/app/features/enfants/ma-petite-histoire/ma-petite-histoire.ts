import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { BackButton } from '../../navigation/back-button/back-button';
import { MaPetiteHistoire as MaPetiteHistoireModel } from '../../../models/ma_petite_histoire';
import { MaPetiteHistoireService } from '../../../services/ma-petite-histoire/ma-petite-histoire.service';

@Component({
  selector: 'app-ma-petite-histoire',
  imports: [BackButton, FormsModule],
  templateUrl: './ma-petite-histoire.html',
  styleUrl: './ma-petite-histoire.css',
})
export class MaPetiteHistoire implements OnInit {
  readonly histoire = signal<MaPetiteHistoireModel | null>(null);
  readonly enfantId = signal<string | null>(null);
  readonly chargement = signal(true);
  readonly erreur = signal(false);
  readonly sauvegardeEnCours = signal(false);
  readonly sauvegardeTerminee = signal(false);
  readonly heures = Array.from({ length: 48 }, (_, index) => {
    const heure = Math.floor(index / 2).toString().padStart(2, '0');
    const minutes = index % 2 === 0 ? '00' : '30';
    return `${heure}:${minutes}`;
  });
  readonly poidsOptions = Array.from({ length: 20 }, (_, index) => index + 1);
  readonly grammesOptions = Array.from({ length: 9 }, (_, index) => (index + 1) * 100);
  grammesSelectionnes: number | null = null;

  poidsSelectOptions(poidsRecu: number | string | null): number[] {
    const poidsNormalise = poidsRecu === null ? null : Number(poidsRecu);

    return [...new Set([
      ...this.poidsOptions,
      ...(poidsNormalise !== null && !Number.isNaN(poidsNormalise) ? [poidsNormalise] : []),
    ])].sort((a, b) => a - b);
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly histoireService: MaPetiteHistoireService,
  ) {}

  ngOnInit(): void {
    const enfantId = this.route.snapshot.paramMap.get('enfantId');
    this.enfantId.set(enfantId);

    if (!enfantId) {
      this.chargement.set(false);
      this.erreur.set(true);
      return;
    }

    this.histoireService.getAll().subscribe({
      next: (histoires) => {
        const fiche = histoires.find((item) => item.enfantId === enfantId);
        const ficheNormalisee = fiche ? this.normaliserHeures(fiche) : this.nouvelleFiche(enfantId);
        this.normaliserPoids(ficheNormalisee);
        this.histoire.set(ficheNormalisee);
        this.chargement.set(false);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la petite histoire', error);
        this.chargement.set(false);
        this.erreur.set(true);
      },
    });
  }

  private nouvelleFiche(enfantId: string): MaPetiteHistoireModel {
    return {
      id: '',
      enfantId,
      personneAccompagnementMatin: null,
      heureArriveeMatin: null,
      personneRecuperationSoir: null,
      heureDepartSoir: null,
      modeAlimentation: null,
      habitudesAlimentaires: null,
      alimentsAEviterAllergies: null,
      alimentsPreferes: null,
      alimentsNonAimes: null,
      positionRepas: null,
      autonomieBiberon: null,
      autonomieRepas: null,
      eauCristalineConvient: null,
      eauApporteeParFamille: null,
      repasFournisParCreche: null,
      utiliseTetine: null,
      utiliseDoudou: null,
      autreObjetApaisement: null,
      signesFatigue: null,
      heureSiesteMatin: null,
      heureSiesteApresMidi: null,
      heureCoucherNuit: null,
      heureReveilMatin: null,
      besoinsSommeil: null,
      modeEndormissement: null,
      chambreSommeil: null,
      typeLit: null,
      positionSommeil: null,
      marcheDepuis: null,
      modeDeplacement: null,
      competencesAutonomie: null,
      jouetsPreferes: null,
      habitudesJeu: null,
      motsPhrasesUtilises: null,
      porteCouches: null,
      tailleCouche: null,
      apprentissagePropreteCommence: null,
      couchePendantSieste: null,
      propreDepuis: null,
      traitementsCutanes: null,
      traitementsOraux: null,
      manifestationsFievre: null,
      modalitesSurveillanceTemperature: null,
      ordonnanceDolipranePresente: null,
      poidsReferenceKg: null,
      dateOrdonnanceDoliprane: null,
    };
  }

  private normaliserHeures(fiche: MaPetiteHistoireModel): MaPetiteHistoireModel {
    const champsHeure = [
      'heureArriveeMatin',
      'heureDepartSoir',
      'heureSiesteMatin',
      'heureSiesteApresMidi',
      'heureCoucherNuit',
      'heureReveilMatin',
    ] as const;

    return {
      ...fiche,
      ...Object.fromEntries(
        champsHeure.map((champ) => [champ, fiche[champ]?.substring(0, 5) ?? null]),
      ),
    };
  }

  private normaliserPoids(fiche: MaPetiteHistoireModel): void {
    const poids = fiche.poidsReferenceKg;
    if (poids === null) {
      this.grammesSelectionnes = null;
      return;
    }

    const poidsTexte = String(poids).trim().replace(',', '.');
    const [kilosTexte, decimalTexte] = poidsTexte.split('.');
    const kilos = Number.parseInt(kilosTexte, 10);
    if (Number.isNaN(kilos)) {
      fiche.poidsReferenceKg = null;
      this.grammesSelectionnes = null;
      return;
    }

    const grammes = decimalTexte
      ? Number.parseInt(decimalTexte.padEnd(3, '0').slice(0, 3), 10)
      : 0;
    fiche.poidsReferenceKg = kilos;
    this.grammesSelectionnes = grammes >= 100 ? grammes : null;
  }

  sauvegarder(form: NgForm): void {
    const histoire = this.histoire();
    if (!histoire || form.invalid) return;

    this.sauvegardeEnCours.set(true);
    this.sauvegardeTerminee.set(false);
    const { id, ...champs } = histoire;
    const data: Partial<MaPetiteHistoireModel> = {
      ...champs,
      eauCristalineConvient: this.valeurBooleenne(champs.eauCristalineConvient),
      utiliseTetine: this.valeurBooleenne(champs.utiliseTetine),
      utiliseDoudou: this.valeurBooleenne(champs.utiliseDoudou),
      porteCouches: this.valeurBooleenne(champs.porteCouches),
      apprentissagePropreteCommence: this.valeurBooleenne(champs.apprentissagePropreteCommence),
      couchePendantSieste: this.valeurBooleenne(champs.couchePendantSieste),
      ordonnanceDolipranePresente: this.valeurBooleenne(champs.ordonnanceDolipranePresente),
      poidsReferenceKg: this.valeurNombre(champs.poidsReferenceKg, this.grammesSelectionnes),
    };
    const requete = histoire.id
      ? this.histoireService.update(histoire.id, data)
      : this.histoireService.create(data);

    requete.subscribe({
      next: (fiche) => {
        const ficheNormalisee = this.normaliserHeures(fiche);
        this.normaliserPoids(ficheNormalisee);
        this.histoire.set(ficheNormalisee);
        this.sauvegardeEnCours.set(false);
        this.sauvegardeTerminee.set(true);
        form.form.markAsPristine();
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde de ma petite histoire', error);
        this.sauvegardeEnCours.set(false);
        this.erreur.set(true);
      },
    });
  }

  valeur(value: string | number | null | undefined): string {
    return value === null || value === undefined || value === '' ? '........................................' : String(value);
  }

  private valeurBooleenne(value: boolean | string | null): boolean | null {
    if (value === null || value === '') return null;
    if (typeof value === 'boolean') return value;
    return value.toLowerCase() === 'true' || value.toLowerCase() === 'oui';
  }

  private valeurNombre(value: number | string | null, grammes: number | null = 0): number | null {
    if (value === null || value === '') return null;
    const nombre = Number(value);
    return Number.isNaN(nombre) ? null : nombre + (grammes ?? 0) / 1000;
  }

}
