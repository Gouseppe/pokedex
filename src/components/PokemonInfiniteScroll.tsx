import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { APIPokemon, PokemonTypes } from '../types';
import { ReactCard } from './ReactCard';
import { getPokemons } from '../config/api/backend/pokemons';
import { $filter, $pokemons, setFilter, setPokemon } from '../shared';
import { useStore } from '@nanostores/react';
import { getPokemon } from '../config/api/backend/pokemon';
import { Charging } from './Charging';

export const PokemonInfiniteScroll = () => {
  const pokemons = useStore($pokemons);
  const filter = useStore($filter);

  useEffect(() => {
    (async () => {
      if (pokemons.length !== filter.cant * (filter.page + 1)) {
        console.log('hizo el fetch');
        const pokemonsUrl = await getPokemons(
          filter.cant,
          filter.page * filter.cant
        );
        const pokemosData: APIPokemon[] = await Promise.all(
          pokemonsUrl.map(async (pokemon: { name: string }) => {
            const response = await getPokemon(pokemon.name);
            return response as APIPokemon;
          })
        );
        pokemons.length === 1
          ? setPokemon([...pokemosData])
          : setPokemon([...pokemons, ...pokemosData]);
      }
    })();
  }, [filter.cant, filter.page]);

  const updateFilter = () => {
    setFilter({ cant: 30, page: filter.page + 1 });
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={pokemons.length || 0}
        next={updateFilter}
        hasMore={pokemons.length > 1}
        loader={<Charging />}
      >
        <div className='gap-4 grid grid-cols-link-card justify-items-center'>
          {pokemons?.map((pokemon) => (
            <ReactCard
              key={pokemon.id}
              id={pokemon.id}
              image={pokemon.sprites.other['official-artwork'].front_default}
              title={pokemon.name}
              types={pokemon.types.map((type: any) => type.type.name)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
