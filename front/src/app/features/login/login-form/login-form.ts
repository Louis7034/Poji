import { Component, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements OnInit {
  email = '';
  password = '';
  rememberSession = false;
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.email = this.authService.getRememberedEmail();
    this.rememberSession = this.email.length > 0;

    if (this.authService.isAuthenticated()) {
      void this.router.navigate(['/accueil']);
    }
  }

  onSubmit(): void {
    if (this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.authService
      .login(this.email, this.password, this.rememberSession)
      .pipe(finalize(() => {
        this.isSubmitting.set(false);
      }))
      .subscribe({
        next: () => {
          void this.router.navigate(['/accueil']);
        },
        error: (error: HttpErrorResponse) => {
          this.password = '';
          this.errorMessage.set(this.getErrorMessage(error));
        },
      });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (typeof error.error?.message === 'string') {
      return error.error.message;
    }

    if (error.status === 0) {
      return 'Le serveur est inaccessible. Vérifiez la connexion puis réessayez.';
    }

    return 'Impossible de se connecter. Vérifiez vos identifiants puis réessayez.';
  }
}
