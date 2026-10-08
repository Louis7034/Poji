import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Dejection } from '../../models/dejection';

export type DejectionCreation = Pick<Dejection, 'type' | 'heure' | 'commentaire'> & {
  enfantId: string;
};

@Injectable({
  providedIn: 'root',
})
export class DejectionService {
  private readonly baseUrl = `${environment.API_URL}/api`;

  constructor(private readonly http: HttpClient) {}

  getForEnfant(enfantId: string) {
    return this.http.get<Dejection[]>(`${this.baseUrl}/enfant/dejection/${enfantId}`);
  }

  create(data: DejectionCreation) {
    return this.http.post<Dejection>(`${this.baseUrl}/dejection`, data);
  }
}
