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

  updatePresence(
    id: string,
    etat: string,
    heureArrivee?: string | null,
    heureDepart?: string | null,
  ) {
    const data: {
      etatPresence: string;
      heureArrivee?: string | null;
      heureDepart?: string | null;
    } = {
      etatPresence: etat.toUpperCase(),
    };

    if (heureArrivee !== undefined) {
      data.heureArrivee = heureArrivee;
    }

    if (heureDepart !== undefined) {
      data.heureDepart = heureDepart;
    }

    return this.http.put(`${this.baseUrl}/${id}`, {
      ...data,
    });
  }
}
