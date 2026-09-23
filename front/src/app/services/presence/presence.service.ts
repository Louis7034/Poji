import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import { Enfant_present_count } from '../../models/enfant_present_count';
import { EnfantPresent } from '../../models/enfant_present';
import { PresenceCalendrier } from '../../models/presence-calendrier';
import { TransmissionMatin } from '../../models/transmission_matin';
import { TransmissionSoir } from '../../models/transmission_soir';

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

  getAll() {
    return this.http.get<PresenceCalendrier[]>(this.baseUrl);
  }

  getTransmissionsMatin(enfantId: string) {
    return this.http.get<TransmissionMatin[]>(
      `${environment.API_URL}/api/transmission-matin/enfant/${enfantId}`,
    );
  }

  getTransmissionsSoir(enfantId: string) {
    return this.http.get<TransmissionSoir[]>(
      `${environment.API_URL}/api/transmission-soir/enfant/${enfantId}`,
    );
  }

  updateTransmissionMatin(
    id: string,
    data: Partial<Pick<TransmissionMatin, 'heureCouche' | 'heureReveille' | 'observation' | 'repas' | 'comportement'>>,
  ) {
    return this.http.put<TransmissionMatin>(
      `${environment.API_URL}/api/transmission-matin/${id}`,
      data,
    );
  }

  updateTransmissionSoir(
    id: string,
    data: Partial<Pick<TransmissionSoir, 'depart' | 'arrivee' | 'observation' | 'evenement' | 'besoin'>>,
  ) {
    return this.http.put<TransmissionSoir>(
      `${environment.API_URL}/api/transmission-soir/${id}`,
      data,
    );
  }

  createPresence(enfantId: string, datePresence: string) {
    return this.http.post<PresenceCalendrier>(this.baseUrl, {
      enfantId,
      datePresence,
      etatPresence: 'PRESENT',
    });
  }

  deletePresence(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
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
