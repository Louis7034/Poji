import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransmissionsMatin } from '../transmissions-matin/transmissions-matin';
import { TransmissionsSoir } from '../transmissions-soir/transmissions-soir';

@Component({
  selector: 'app-transmissions-panel',
  imports: [TransmissionsMatin, TransmissionsSoir],
  templateUrl: './transmissions-panel.html',
  styleUrl: './transmissions-panel.css',
})
export class TransmissionsPanel implements OnInit {
  readonly enfantId = signal('');
  readonly onglet = signal<'matin' | 'soir'>('matin');

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const enfantId = this.route.snapshot.paramMap.get('enfantId');
    if (enfantId) {
      this.enfantId.set(enfantId);
    }
  }
}
