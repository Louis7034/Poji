import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Personnel } from '../../models/personnel';

@Injectable({
  providedIn: 'root',
})
export class PersonnelService {
  private baseUrl = `${environment.API_URL}/api/personnel`;

  constructor(private readonly http: HttpClient) {}

  getPersonnel() {
    return this.http.get<Personnel[]>(this.baseUrl);
  }

  getPersonnelById(id: string) {
    return this.http.get<Personnel>(`${this.baseUrl}/${id}`);
  }

  createPersonnel(personnel: Partial<Personnel>) {
    return this.http.post<Personnel>(this.baseUrl, personnel);
  }

  updatePersonnel(id: string, personnel: Partial<Personnel>) {
    return this.http.put<Personnel>(`${this.baseUrl}/${id}`, personnel);
  }

  deletePersonnel(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
