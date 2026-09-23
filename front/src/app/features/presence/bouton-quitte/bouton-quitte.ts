import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bouton-quitte',
  imports: [],
  templateUrl: './bouton-quitte.html',
  styleUrl: './bouton-quitte.css',
})
export class BoutonQuitte {
  @Input() quitte = false;
  @Output() readonly quitteChange = new EventEmitter<boolean>();
}
