import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environment/environment';
import { Achievement } from '../../models/achievement';

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
}
