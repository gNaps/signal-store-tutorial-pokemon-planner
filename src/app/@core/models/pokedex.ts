import { Pokemon } from './pokemon';

export interface Pokedex {
  first: Pokemon[];
  second: Pokemon[];
  third: Pokemon[];
  fourth: Pokemon[];
  fifth: Pokemon[];
  sixth: Pokemon[];
  seventh: Pokemon[];
  eigth: Pokemon[];
  ninth: Pokemon[];
}

export type PokedexGen = keyof Pokedex;
