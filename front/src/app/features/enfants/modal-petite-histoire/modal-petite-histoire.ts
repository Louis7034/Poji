import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Enfant } from '../../../models/enfant';

@Component({
  selector: 'app-modal-petite-histoire',
  imports: [],
  templateUrl: './modal-petite-histoire.html',
  styleUrl: './modal-petite-histoire.css',
})
export class ModalPetiteHistoire {
  @Input({ required: true }) enfant!: Enfant;
  @Output() fermer = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  gererEchap(): void {
    this.fermer.emit();
  }
}
