import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokedex } from '../../models/pokedex';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  httpClient = inject(HttpClient);

  load(): Observable<Pokedex> {
    return this.httpClient.get<Pokedex>('http://localhost:3000/pokedex');
  }
}
