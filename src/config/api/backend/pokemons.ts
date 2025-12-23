import type { APIPokemon, APIPokemons, Result } from "../../../types";
import type { PokemonDeno } from "../../../types/api/deno-api";
import { API_URL } from "../../consts";

export const getPokemons = async (
  limit: number,
  offset: number
): Promise<Result[]> => {
  const response = await fetch(
    `${API_URL}pokemon?limit=${limit}&offset=${offset}`
  );
  const result: APIPokemons = await response.json();
  const allPokemons = result.results;

  return allPokemons;
};

export const getPokemonsData = async (
  limit: number,
  offset: number
): Promise<PokemonDeno[]> => {
  const response = await fetch(
    `https://pokeapi.deno.dev/pokemon?limit=${limit}&offset=${offset + 1}`
  );
  const result: PokemonDeno[] = await response.json();
  const allPokemons = result;

  return allPokemons;
};
