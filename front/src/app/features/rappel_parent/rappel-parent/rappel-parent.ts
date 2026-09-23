import { Component, Input, OnChanges, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RappelParent as RappelParentModel } from '../../../models/rappel_parent';
import { RappelParentService } from '../../../services/rappel-parent/rappel-parent.service';

@Component({
  selector: 'app-rappel-parent',
  imports: [DatePipe],
  templateUrl: './rappel-parent.html',
  styleUrl: './rappel-parent.css',
})
export class RappelParent implements OnInit, OnChanges {
  @Input() refresh = 0;

  readonly rappels = signal<RappelParentModel[]>([]);

  constructor(private readonly rappelParentService: RappelParentService) {}

  ngOnInit(): void {
    this.chargerRappels();
  }

  ngOnChanges(): void {
    if (this.refresh > 0) {
      this.chargerRappels();
    }
  }

  private chargerRappels(): void {
    this.rappelParentService.getAll().subscribe({
      next: (rappels) => this.rappels.set(rappels),
      error: (error) => console.error('Erreur lors de la récupération des rappels parents', error),
    });
  }
}
