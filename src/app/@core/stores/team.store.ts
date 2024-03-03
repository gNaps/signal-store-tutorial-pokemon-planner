import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
import { Team } from '../models/team';
import { computed, inject } from '@angular/core';
import { TeamsService } from '../services/teams/teams.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { getPokemonImage, getPokemonSprite } from '../utils';
import { PokedexStore } from './pokedex.store';
import { Pokemon } from '../models/pokemon';

interface TeamState {
  teams: Team[];
  isLoading: boolean;
  error: string;
  team: Team | null;
}

const initialState: TeamState = {
  teams: [],
  isLoading: false,
  error: '',
  team: null
};

export const TeamStore = signalStore(
  { providedIn: 'root' },
  withState<TeamState>(initialState),
  withComputed((store) => ({
    teamsCount: computed(() => store.teams().length),
    teamsList: computed(() =>
      store.teams().map((t) => ({
        ...t,
        pokemons: t.pokemons.map((p) => ({
          ...p,
          image: getPokemonImage(p.id),
          sprite: getPokemonSprite(p.id)
        }))
      }))
    ),
    teamSelected: computed(() => {
      return store.team()
        ? {
            ...store.team(),
            pokemons: store.team()!.pokemons.map((p) => ({
              ...p,
              image: getPokemonImage(p.id),
              sprite: getPokemonSprite(p.id)
            }))
          }
        : null;
    })
  })),
  withMethods(
    (
      store,
      teamService = inject(TeamsService),
      pokedexStore = inject(PokedexStore)
    ) => ({
      loadTeams: rxMethod<void>(
        pipe(
          switchMap(() => teamService.findAll()),
          tap((teams) => patchState(store, { teams }))
        )
      ),
      loadTeam: rxMethod<string>(
        pipe(
          switchMap((id) => teamService.findOne(id)),
          tap((team) => {
            patchState(store, { team });
            pokedexStore.setActiveTeam(team);
          })
        )
      ),
      createTeam() {},
      deleteTeam() {},
      addPokemonToTeam: rxMethod<Pokemon>(
        pipe(
          switchMap(({ id, name }) => {
            const team = { ...store.team()! };
            if (team?.pokemons.length === 6) {
              team.pokemons.splice(0, 1);
            }
            team?.pokemons.push({ id, name });
            return teamService.update(team.id, team).pipe(
              tap(() => {
                patchState(store, { team });
                pokedexStore.setActiveTeam(team);
              })
            );
          })
        )
      ),
      removePokemonToTeam: rxMethod<number>(
        pipe(
          switchMap((index) => {
            const team = { ...store.team()! };
            team?.pokemons.splice(index, 1);
            return teamService.update(team.id, team).pipe(
              tap(() => {
                patchState(store, { team });
                pokedexStore.setActiveTeam(team);
              })
            );
          })
        )
      )
    })
  )
);
