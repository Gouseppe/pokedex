import type { APIPokemon } from "../../../types";
import { API_URL } from "../../consts";

export const getPokemon = async (name: string): Promise<APIPokemon | null> => {
  const response = await fetch(`${API_URL}pokemon/${name.toLowerCase()}`);
  if (response.status === 200) {
    const pokemon = await response.json();
    return pokemon;
  }

  return null;
};
