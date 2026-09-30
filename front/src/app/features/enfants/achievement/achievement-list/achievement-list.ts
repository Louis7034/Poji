import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Enfant } from '../../../../models/enfant';

@Component({
  selector: 'app-achievement-list',
  imports: [RouterLink],
  templateUrl: './achievement-list.html',
  styleUrl: './achievement-list.css',
})
export class AchievementList {
  @Input({ required: true }) enfant!: Enfant;
  @Output() fermer = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  gererEchap(): void {
    this.fermer.emit();
  }
}
