import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Enfant } from '../../../models/enfant';
import { EnfantsService } from '../../../services/enfants/enfants.service';

@Component({
  selector: 'app-creation-enfant',
  imports: [ReactiveFormsModule],
  templateUrl: './creation-enfant.html',
  styleUrl: './creation-enfant.css',
})
export class CreationEnfant {
  @Output() readonly enfantCree = new EventEmitter<Enfant>();

  readonly envoiEnCours = signal(false);
  readonly erreur = signal<string | null>(null);

  readonly formulaire = new FormGroup({
    prenom: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(80)],
    }),
    dateArrive: new FormControl<string | null>(null),
  });

  constructor(private readonly enfantsService: EnfantsService) {}

  creerEnfant(): void {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    this.envoiEnCours.set(true);
    this.erreur.set(null);
    const { prenom, dateArrive } = this.formulaire.getRawValue();

    this.enfantsService.createEnfant({ prenom: prenom.trim(), dateArrive }).subscribe({
      next: (enfant) => {
        this.enfantCree.emit(enfant);
        this.formulaire.reset({ prenom: '', dateArrive: null });
        this.envoiEnCours.set(false);
      },
      error: () => {
        this.erreur.set("La création de l'enfant a échoué. Veuillez réessayer.");
        this.envoiEnCours.set(false);
      },
    });
  }
}
