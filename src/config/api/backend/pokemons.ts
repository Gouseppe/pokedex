import type { APIPokemons, Result } from '../../../types';
import { API_URL } from '../../consts';

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
