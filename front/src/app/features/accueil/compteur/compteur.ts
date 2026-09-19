import {Component, OnInit, signal} from '@angular/core';
import {EnfantsService} from '../../../services/enfants/enfants.service';
import {Enfant} from '../../../models/enfant';
import {PersonnelService} from '../../../services/personnel/personnel.service';
import {Personnel} from '../../../models/personnel';
import { EnfantPresent } from '../../../models/enfantPresent';
import { PresenceService } from '../../../services/presence/presence.service';

@Component({
  selector: 'app-compteur',
  imports: [],
  templateUrl: './compteur.html',
  styleUrl: './compteur.css',
})
export class Compteur implements OnInit {
  constructor(private readonly enfantsService: EnfantsService,
              private readonly presenceService: PresenceService,
              private readonly personnelService: PersonnelService) {}

  readonly enfantData = signal<Enfant[]>([]);
  readonly personnelData = signal<Personnel | null>(null);
  readonly presenceData = signal<EnfantPresent | null>(null);

  ngOnInit() {
    this.enfantsService.getEnfants().subscribe((enfants: Enfant[]) => {
      this.enfantData.set(enfants);
    });

    this.personnelService.getPersonnelById('10000000-0000-0000-0000-000000000001').subscribe((Personnel: Personnel) => {
      this.personnelData.set(Personnel);
    });
    this.presenceService.getEnfantPresents().subscribe((present: EnfantPresent) => {
        this.presenceData.set(present);
    });
  }
}
