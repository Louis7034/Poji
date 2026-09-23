import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Journal } from '../../models/journal';

@Injectable({ providedIn: 'root' })
export class JournalService {
  private readonly baseUrl = `${environment.API_URL}/api/journal`;

  constructor(private readonly http: HttpClient) {}

  getByEnfant(enfantId: string) {
    return this.http.get<Journal[]>(`${this.baseUrl}/enfant/${enfantId}`);
  }
}
