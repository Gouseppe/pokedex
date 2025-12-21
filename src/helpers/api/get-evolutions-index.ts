import type { APIEvolutionChain } from "../../types/api";

export const getEvolutionsIndex = (evolutionChain: APIEvolutionChain) => {
  const evolutionsIndex: {
    name: string;
    index: string;
    evolves_to?: number | null;
  }[] = [];

  evolutionsIndex.push({
    index: (
      (evolutionChain.chain.species.url as string).match(
        /\/([0-9]+)\//
      ) as string[]
    )[1],
    name: evolutionChain.chain.species.name,
  });

  if (evolutionChain.chain.evolves_to[0]) {
    evolutionsIndex.push({
      index: (
        (evolutionChain.chain.evolves_to[0].species.url as string).match(
          /\/([0-9]+)\//
        ) as string[]
      )[1],
      name: evolutionChain.chain.evolves_to[0].species.name,
      evolves_to:
        evolutionChain.chain.evolves_to[0].evolution_details[0]?.min_level,
    });

    if (evolutionChain.chain.evolves_to[0].evolves_to[0]) {
      evolutionsIndex.push({
        index: (
          (
            evolutionChain.chain.evolves_to[0].evolves_to[0].species
              .url as string
          ).match(/\/([0-9]+)\//) as string[]
        )[1],
        name: evolutionChain.chain.evolves_to[0].evolves_to[0].species.name,
        evolves_to:
          evolutionChain.chain.evolves_to[0].evolves_to[0].evolution_details[0]
            .min_level,
      });
    }
  }

  return evolutionsIndex;
};
