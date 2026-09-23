import { Component, OnInit, signal } from '@angular/core';
import {Compteur} from '../compteur/compteur';
import { PersonnelService } from '../../../services/personnel/personnel.service';
import { Personnel } from '../../../models/personnel';
import { PresentAujourdhui } from '../present-aujourdhui/present-aujourdhui';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [Compteur, PresentAujourdhui, RouterLink, RouterLinkActive],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
  standalone: true,
})
export class Accueil implements OnInit {
  constructor(private readonly personnelService: PersonnelService) {}

  readonly personnelData = signal<Personnel | null>(null);

  ngOnInit() {
    this.personnelService
      .getPersonnelById('10000000-0000-0000-0000-000000000001')
      .subscribe((Personnel: Personnel) => {
        this.personnelData.set(Personnel);
      });
  }
}
