import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Personnel } from '../../../models/personnel';
import { PersonnelService } from '../../../services/personnel/personnel.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personnel-total',
  imports: [DatePipe],
  templateUrl: './personnel-total.html',
  styleUrl: './personnel-total.css',
})
export class PersonnelTotal implements OnInit {
  readonly personnels = signal<Personnel[]>([]);

  constructor(
    private readonly personnelService: PersonnelService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.personnelService.getPersonnel().subscribe({
      next: (personnels) => this.personnels.set(personnels),
      error: (error) => console.error('Erreur lors de la récupération du personnel', error),
    });
  }
}
