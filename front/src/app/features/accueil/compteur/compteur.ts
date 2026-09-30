import {Component, OnInit, signal} from '@angular/core';
import {EnfantsService} from '../../../services/enfants/enfants.service';
import {Enfant} from '../../../models/enfant';
import { Enfant_present_count } from '../../../models/enfant_present_count';
import { PresenceService } from '../../../services/presence/presence.service';

@Component({
  selector: 'app-compteur',
  imports: [],
  templateUrl: './compteur.html',
  styleUrl: './compteur.css',
  standalone: true,
})
export class Compteur implements OnInit {
  constructor(
    private readonly enfantsService: EnfantsService,
    private readonly presenceService: PresenceService
  ) {}

  readonly enfantData = signal<Enfant[]>([]);
  readonly presenceData = signal<Enfant_present_count | null>(null);

  ngOnInit() {
    this.enfantsService.getEnfants().subscribe((enfants: Enfant[]) => {
      this.enfantData.set(enfants);
    });

    this.presenceService.getEnfantCountPresents().subscribe((present: Enfant_present_count) => {
      this.presenceData.set(present);
    });
  }
}
