import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import { Enfant_present_count } from '../../models/enfant_present_count';
import { EnfantPresent } from '../../models/enfant_present';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private baseUrl = `${environment.API_URL}/api/presence`;

  constructor(private readonly http: HttpClient) {}

  getEnfantCountPresents() {
    return this.http.get<Enfant_present_count>(`${this.baseUrl}/compteur-aujourd-hui`);
  }

  getEnfantPresentToday() {
    return this.http.get<EnfantPresent[]>(`${this.baseUrl}/enfants-present`);
  }
}
