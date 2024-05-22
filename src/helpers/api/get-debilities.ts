import type { PokemonType, PokemonTypes } from '../../types';

export const getDebilities = (debilitiesObject: PokemonType[]) => {
  const debilities: { name: string; value: number }[] = [];
  const result = [];

  debilitiesObject.forEach((e) => {
    e.damage_relations.double_damage_from.forEach((element) => {
      debilities.push({
        name: element.name,
        value: 2,
      });
    });

    e.damage_relations.half_damage_from.forEach((element) => {
      debilities.push({
        name: element.name,
        value: 0.5,
      });
    });

    e.damage_relations.no_damage_from.forEach((element) => {
      debilities.push({
        name: element.name,
        value: 0,
      });
    });
  });

  debilities.sort((a, b) => (a.name > b.name ? -1 : 1));
  for (let index = 0; index < debilities.length; index++) {
    if (debilities[index].name === debilities[index + 1]?.name) {
      result.push({
        name: debilities[index].name,
        value: debilities[index].value * debilities[index + 1].value,
      });
      index++;
    } else {
      result.push(debilities[index]);
    }
  }
  return result;
};
