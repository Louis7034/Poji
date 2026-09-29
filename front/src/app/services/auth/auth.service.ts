import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment/environment';

export interface AuthenticatedUser {
  id: string;
  role: string;
  prenom: string;
  email: string;
  createdAt: string;
}

interface LoginResponse {
  user: AuthenticatedUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl = `${environment.API_URL}/api/auth/login`;
  private readonly sessionKey = 'poji-authenticated-user';
  private readonly rememberedEmailKey = 'poji-remembered-email';

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string, rememberSession: boolean): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, password }).pipe(
      tap(({ user }) => {
        this.clearSession();
        const storage = rememberSession ? localStorage : sessionStorage;
        storage.setItem(this.sessionKey, JSON.stringify(user));

        if (rememberSession) {
          localStorage.setItem(this.rememberedEmailKey, email);
        } else {
          localStorage.removeItem(this.rememberedEmailKey);
        }
      }),
    );
  }

  logout(): void {
    this.clearSession();
  }

  isAuthenticated(): boolean {
    return this.getStoredUser() !== null;
  }

  getRememberedEmail(): string {
    return localStorage.getItem(this.rememberedEmailKey) ?? '';
  }

  getCurrentUser(): AuthenticatedUser | null {
    const storedUser = this.getStoredUser();

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as AuthenticatedUser;
    } catch {
      this.clearSession();
      return null;
    }
  }

  getCurrentUserId(): string | null {
    return this.getCurrentUser()?.id ?? null;
  }

  private getStoredUser(): string | null {
    return localStorage.getItem(this.sessionKey) ?? sessionStorage.getItem(this.sessionKey);
  }

  private clearSession(): void {
    localStorage.removeItem(this.sessionKey);
    sessionStorage.removeItem(this.sessionKey);
  }
}
