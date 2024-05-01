import { atom } from 'nanostores';
import type { APIPokemon } from '../types';

export const $pokemons = atom<APIPokemon[]>([]);
export const $pokemonName = atom<string>('');

export const setPokemon = (pokemons: APIPokemon[]) => {
  $pokemons.set(pokemons);
};

export const setPokemonName = (name: string) => {
  $pokemonName.set(name);
};
