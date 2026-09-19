import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Enfant } from '../../models/enfant';

@Injectable({
  providedIn: 'root',
})
export class EnfantsService {
  private baseUrl = `${environment.API_URL}/api/enfants`;

  constructor(private readonly http: HttpClient) {}

  getEnfants() {
    return this.http.get<Enfant[]>(this.baseUrl);
  }

  getEnfant(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEnfant(enfant: Partial<Enfant>) {
    return this.http.post<Enfant>(this.baseUrl, enfant);
  }

  updateEnfant(id: string, enfant: Partial<Enfant>) {
    return this.http.put<Enfant>(`${this.baseUrl}/${id}`, enfant);
  }

  deleteEnfant(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
