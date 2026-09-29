import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Personnel } from '../../../models/personnel';
import { PersonnelService } from '../../../services/personnel/personnel.service';

@Component({
  selector: 'app-personnel-total',
  imports: [DatePipe],
  templateUrl: './personnel-total.html',
  styleUrl: './personnel-total.css',
})
export class PersonnelTotal implements OnInit {
  readonly personnels = signal<Personnel[]>([]);

  constructor(private readonly personnelService: PersonnelService) {}

  ngOnInit(): void {
    this.personnelService.getPersonnel().subscribe({
      next: (personnels) => this.personnels.set(personnels),
      error: (error) => console.error('Erreur lors de la récupération du personnel', error),
    });
  }
}
