import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { MaPetiteHistoire } from '../../models/ma_petite_histoire';

@Injectable({
  providedIn: 'root',
})
export class MaPetiteHistoireService {
  private readonly baseUrl = `${environment.API_URL}/api/ma-petite-histoire`;

  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<MaPetiteHistoire[]>(this.baseUrl);
  }

  create(histoire: Partial<MaPetiteHistoire>) {
    return this.http.post<MaPetiteHistoire>(this.baseUrl, histoire);
  }

  update(id: string, histoire: Partial<MaPetiteHistoire>) {
    return this.http.put<MaPetiteHistoire>(`${this.baseUrl}/${id}`, histoire);
  }
}
