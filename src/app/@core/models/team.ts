import { Pokemon } from './pokemon';

export interface Team {
  id: string;
  name: string;
  pokemons: Pokemon[];
}
