import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { RappelParent } from '../../models/rappel_parent';

export interface RappelParentCreation {
  enfantId: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class RappelParentService {
  private readonly baseUrl = `${environment.API_URL}/api/rappel-parent`;
  readonly count = signal(0);

  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<RappelParent[]>(this.baseUrl).pipe(
      tap((rappels) => this.count.set(rappels.length)),
    );
  }

  create(rappel: RappelParentCreation) {
    return this.http.post<RappelParent>(this.baseUrl, rappel).pipe(
      tap(() => this.count.update((count) => count + 1)),
    );
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.count.update((count) => Math.max(0, count - 1))),
    );
  }
}
