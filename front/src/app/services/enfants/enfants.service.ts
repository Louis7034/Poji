import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})

const API_URL = environment.API_URL;

export class EnfantsService {
  private baseUrl = `${API_URL}/enfants`;

  constructor(private http: HttpClient) {}

  getEnfants() {
    return this.http.get(`${this.baseUrl}`);
  }

  getEnfant(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEnfant(enfant: any) {
    return this.http.post(`${this.baseUrl}`, enfant);
  }

  updateEnfant(id: number, enfant: any) {
    return this.http.put(`${this.baseUrl}/${id}`, enfant);
  }

  deleteEnfant(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
