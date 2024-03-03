import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { PokedexService } from '../services/pokedex/pokedex.service';
import { Pokedex, PokedexGen } from '../models/pokedex';
import { Team } from '../models/team';

interface PokedexState {
  pokedex: Pokedex;
  genActive: PokedexGen;
  team: Team | null;
}

const initialState: PokedexState = {
  pokedex: {
    first: [],
    second: [],
    third: [],
    fourth: [],
    fifth: [],
    sixth: [],
    seventh: [],
    eigth: [],
    ninth: []
  },
  genActive: 'first',
  team: null
};

export const PokedexStore = signalStore(
  { providedIn: 'root' },
  withState<PokedexState>(initialState),
  withComputed((store) => ({
    activePokedex: computed(() =>
      store.pokedex[store.genActive()]().filter(
        (p) => !store.team()?.pokemons.some((tp) => tp.id === p.id)
      )
    )
  })),
  withMethods((store, pokedexService = inject(PokedexService)) => ({
    loadPokedex: rxMethod<void>(
      pipe(
        switchMap(() => pokedexService.load()),
        tap((pokedex) => patchState(store, { pokedex }))
      )
    ),
    setActiveGen(gen: PokedexGen) {
      patchState(store, { genActive: gen });
    },
    setActiveTeam(team: Team) {
      console.log('set active team', team);
      patchState(store, { team });
    }
  }))
);
