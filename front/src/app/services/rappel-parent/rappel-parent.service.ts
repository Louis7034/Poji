import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { RappelParent } from '../../models/rappel_parent';

export interface RappelParentCreation {
  enfantId: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class RappelParentService {
  private readonly baseUrl = `${environment.API_URL}/api/rappel-parent`;

  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<RappelParent[]>(this.baseUrl);
  }

  create(rappel: RappelParentCreation) {
    return this.http.post<RappelParent>(this.baseUrl, rappel);
  }
}
