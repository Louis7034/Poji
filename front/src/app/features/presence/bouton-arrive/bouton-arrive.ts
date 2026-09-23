import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bouton-arrive',
  imports: [],
  templateUrl: './bouton-arrive.html',
  styleUrl: './bouton-arrive.css',
})
export class BoutonArrive {
  @Input() arrive = false;
  @Output() readonly arriveChange = new EventEmitter<boolean>();
}
