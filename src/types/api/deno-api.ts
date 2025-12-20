export type PokemonDeno = {
  id: number;
  name: string;
  genus: string;
  description: string;
  imageUrl: string;
  types: string[];
  abilities: AbilityDeno[];
  stats: StatsDeno;
  locations: string[];
  color: string;
};

export type AbilityDeno = {
  name: string;
  effect: string;
  description: string;
};

export type StatsDeno = {
  HP: number;
  Attack: number;
  Defense: number;
  "Special Attack": number;
  "Special Defense": number;
  Speed: number;
};
