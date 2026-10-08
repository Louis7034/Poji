import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { dejection } from '../../../../../enum/dejection';
import { DejectionService } from '../../../../../services/presence/dejection.service';

@Component({
  selector: 'app-dejection-creation',
  imports: [FormsModule],
  templateUrl: './dejection-creation.html',
  styleUrl: './dejection-creation.css',
})
export class DejectionCreation {
  @Input({ required: true }) enfantId!: string;
  @Output() created = new EventEmitter<void>();

  readonly typesDejection = Object.values(dejection);
  type = '';
  heure = new Date().toTimeString().slice(0, 5);
  commentaire = '';
  erreur = '';
  envoiEnCours = false;

  constructor(private readonly dejectionService: DejectionService) {}

  creerDejection(): void {
    if (!this.enfantId || !this.type.trim() || !this.heure) {
      this.erreur = 'Saisissez un type et une heure pour la déjection.';
      return;
    }

    this.erreur = '';
    this.envoiEnCours = true;
    this.dejectionService.create({
      type: this.type.trim(),
      heure: this.heure,
      commentaire: this.commentaire.trim() || null,
      enfantId: this.enfantId,
    }).subscribe({
      next: () => {
        this.type = '';
        this.commentaire = '';
        this.heure = new Date().toTimeString().slice(0, 5);
        this.envoiEnCours = false;
        this.created.emit();
      },
      error: (error) => {
        console.error('Erreur lors de la création de la déjection', error);
        this.erreur = 'La déjection n’a pas pu être créée.';
        this.envoiEnCours = false;
      },
    });
  }
}
