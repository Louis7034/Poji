import { Component, OnInit, signal } from '@angular/core';
import {Compteur} from '../compteur/compteur';
import { PersonnelService } from '../../../services/personnel/personnel.service';
import { Personnel } from '../../../models/personnel';
import { PresentAujourdhui } from '../present-aujourdhui/present-aujourdhui';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RappelParentRecap } from '../rappel-parent-recap/rappel-parent-recap';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [Compteur, PresentAujourdhui, RappelParentRecap, RouterLink, RouterLinkActive],
  selector: 'app-accueil',
  styleUrl: './accueil.css',
  templateUrl: './accueil.html',
  standalone: true,
})
export class Accueil implements OnInit {
  constructor(
    private readonly personnelService: PersonnelService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  readonly personnelData = signal<Personnel | null>(null);

  ngOnInit() {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      void this.router.navigate(['/login']);
      return;
    }

    this.personnelService
      .getPersonnelById(userId)
      .subscribe((Personnel: Personnel) => {
        this.personnelData.set(Personnel);
      });
  }
}
