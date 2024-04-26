import type { APIPokemon } from '../../../types';
import { API_URL } from '../../consts';

export const getPokemon = async (name: string): Promise<APIPokemon> => {
  const response = await fetch(`${API_URL}pokemon/${name}`);
  const pokemon: APIPokemon = await response.json();

  return pokemon;
};
