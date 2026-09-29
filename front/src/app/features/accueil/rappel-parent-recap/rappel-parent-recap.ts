import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RappelParent as RappelParentModel } from '../../../models/rappel_parent';
import { RappelParentService } from '../../../services/rappel-parent/rappel-parent.service';

@Component({
  selector: 'app-rappel-parent-recap',
  imports: [DatePipe],
  templateUrl: './rappel-parent-recap.html',
  styleUrl: './rappel-parent-recap.css',
})
export class RappelParentRecap implements OnInit {
  readonly rappels = signal<RappelParentModel[]>([]);

  constructor(private readonly rappelParentService: RappelParentService) {}

  ngOnInit(): void {
    this.rappelParentService.getAll().subscribe({
      next: (rappels) => this.rappels.set(rappels),
      error: (error) => console.error('Erreur lors de la récupération des rappels parents', error),
    });
  }
}
