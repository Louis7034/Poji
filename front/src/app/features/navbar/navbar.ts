import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RappelParentService } from '../../services/rappel-parent/rappel-parent.service';

@Component({
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
  standalone: true,
})
export class Navbar implements OnInit {
  readonly labelsVisible = signal(false);
  get rappelsCount(): number {
    return this.rappelParentService.count();
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly rappelParentService: RappelParentService,
  ) {}

  ngOnInit(): void {
    this.rappelParentService.getAll().subscribe({
      next: () => undefined,
      error: (error) => console.error('Erreur lors de la récupération des rappels parents', error),
    });
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }

  toggleLabels(): void {
    this.labelsVisible.update((visible) => !visible);
  }
}
