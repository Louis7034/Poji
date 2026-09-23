import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Enfant } from '../../../models/enfant';
import { EnfantsService } from '../../../services/enfants/enfants.service';
import { RappelParentService } from '../../../services/rappel-parent/rappel-parent.service';
import { RappelParent } from '../rappel-parent/rappel-parent';

@Component({
  selector: 'app-rappel-creation',
  imports: [FormsModule, RappelParent],
  templateUrl: './rappel-creation.html',
  styleUrl: './rappel-creation.css',
})
export class RappelCreation implements OnInit {
  readonly enfants = signal<Enfant[]>([]);
  readonly refresh = signal(0);
  message = '';
  enfantId = '';
  erreur = '';
  envoiEnCours = false;

  constructor(
    private readonly enfantsService: EnfantsService,
    private readonly rappelParentService: RappelParentService,
  ) {}

  ngOnInit(): void {
    this.enfantsService.getEnfants().subscribe({
      next: (enfants) => this.enfants.set(enfants),
      error: (error) => {
        console.error('Erreur lors de la récupération des enfants', error);
        this.erreur = 'Impossible de charger la liste des enfants.';
      },
    });
  }

  creerRappel(): void {
    if (!this.enfantId || !this.message.trim()) {
      this.erreur = 'Sélectionnez un enfant et saisissez un message.';
      return;
    }

    this.erreur = '';
    this.envoiEnCours = true;
    this.rappelParentService.create({
      enfantId: this.enfantId,
      message: this.message.trim(),
    }).subscribe({
      next: () => {
        this.message = '';
        this.enfantId = '';
        this.refresh.update((value) => value + 1);
        this.envoiEnCours = false;
      },
      error: (error) => {
        console.error('Erreur lors de la création du rappel parent', error);
        this.erreur = 'Le rappel n’a pas pu être créé.';
        this.envoiEnCours = false;
      },
    });
  }
}
