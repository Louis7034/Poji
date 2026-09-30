import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment/environment';
import { Achievement } from '../../models/achievement';
import {
  AchievementObservation,
  AchievementObservateur,
} from '../../models/achievement-observation';

@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  private readonly baseUrl = `${environment.API_URL}/api/achievement`;

  constructor(private readonly http: HttpClient) {}

  getByCategorie(categorie: string): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(this.baseUrl).pipe(
      map((achievements) =>
        achievements.filter(
          (achievement) =>
            achievement.categorie.trim().toLowerCase() === categorie.toLowerCase(),
        ),
      ),
    );
  }

  getObservationsByEnfant(enfantId: string): Observable<AchievementObservation[]> {
    return this.http.get<AchievementObservation[]>(
      `${environment.API_URL}/api/achievement-observation/enfant/${enfantId}`,
    );
  }

  getObservateurs(): Observable<AchievementObservateur[]> {
    return this.http.get<AchievementObservateur[]>(
      `${environment.API_URL}/api/achievement-observateur`,
    );
  }

  createObservation(
    data: Omit<AchievementObservation, 'id' | 'dateObservation'>,
  ): Observable<AchievementObservation> {
    return this.http.post<AchievementObservation>(
      `${environment.API_URL}/api/achievement-observation`,
      { ...data, dateObservation: new Date().toISOString() },
    );
  }

  updateObservation(
    id: string,
    data: {
      reponse?: number;
      professionnelResponse?: number;
    },
  ): Observable<AchievementObservation> {
    return this.http.put<AchievementObservation>(
      `${environment.API_URL}/api/achievement-observation/${id}`,
      { ...data, dateObservation: new Date().toISOString() },
    );
  }
}
