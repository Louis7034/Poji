import { Component, OnInit, signal } from '@angular/core';
import { PresenceService } from '../../../services/presence/presence.service';
import { EnfantPresent } from '../../../models/enfant_present';

@Component({
  selector: 'app-present-aujourdhui',
  imports: [],
  templateUrl: './present-aujourdhui.html',
  styleUrl: './present-aujourdhui.css',
})
export class PresentAujourdhui implements OnInit {
  constructor(private readonly presenceService: PresenceService) {}


  readonly enfantPresentTodaySignal = signal<EnfantPresent[]>([]);

  ngOnInit() {
    this.presenceService.getEnfantPresentToday().subscribe((enfantPresent: EnfantPresent[]) => {
      this.enfantPresentTodaySignal.set(enfantPresent);
    });
  }
}
