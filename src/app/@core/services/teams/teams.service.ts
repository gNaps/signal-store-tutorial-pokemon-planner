import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  httpClient = inject(HttpClient);

  findAll(): Observable<Team[]> {
    return this.httpClient.get<Team[]>('http://localhost:3000/teams');
  }

  findOne(id: string): Observable<Team> {
    return this.httpClient.get<Team>(`http://localhost:3000/teams/${id}`);
  }

  update(id: string, payload: Team): Observable<Team> {
    return this.httpClient.patch<Team>(
      `http://localhost:3000/teams/${id}`,
      payload
    );
  }
}
