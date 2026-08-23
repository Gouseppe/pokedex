// import { atom } from "nanostores";
// import type { APIPokemon } from "../types";
// import type { PokemonDeno } from "../types/api/deno-api";

// export const $pokemons = atom<PokemonDeno[] | undefined>([]);
// export const $pokemonName = atom<string>("");
// export const $pokemon = atom<APIPokemon | undefined | null>(undefined);

// export const setPokemons = (pokemons: PokemonDeno[] | undefined) => {
//   $pokemons.set(pokemons);
// };
// export const setPokemon = (pokemon: APIPokemon | undefined | null) => {
//   $pokemon.set(pokemon);
// };

// export const setPokemonName = (name: string) => {
//   $pokemonName.set(name);
// };
import { atom } from "nanostores";
import type { APIPokemon } from "../types";

export const $pokemons = atom<APIPokemon[] | undefined>([]);
export const $pokemonName = atom<string>("");
export const $pokemon = atom<APIPokemon | undefined | null>(undefined);

export const setPokemons = (pokemons: APIPokemon[] | undefined) => {
  $pokemons.set(pokemons);
};
export const setPokemon = (pokemon: APIPokemon | undefined | null) => {
  $pokemon.set(pokemon);
};

export const setPokemonName = (name: string) => {
  $pokemonName.set(name);
};
