import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import { EnfantPresent } from '../../models/enfantPresent';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {

  private baseUrl = `${environment.API_URL}/api/presence`;

  constructor(private readonly http: HttpClient) {}

  getEnfantPresents() {
    return this.http.get<EnfantPresent>(`${this.baseUrl}/compteur-aujourd-hui`);
  }
}
