import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './AstroCard.astro';
import type { PokemonTypes } from '../types';
import { ReactCard } from './ReactCard';

export const PokemonInfiniteScroll = () => {
  const [pokemons, setPokemons] = useState<
    { name: string; id: number; image: string; types: PokemonTypes[] }[] | []
  >([]);

  const [filter, setFilter] = useState<{ cant: number; page: number }>({
    cant: 30,
    page: 0,
  });

  console.log(pokemons);

  useEffect(() => {
    (async () => {
      const pokemonsUrl = await (
        await (
          await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${filter.cant}&offset=${
              filter.page * filter.cant
            }`
          )
        ).json()
      ).results;
      const pokemosData = await Promise.all(
        pokemonsUrl.map(async (pokemon: { url: RequestInfo | URL }) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return data;
        })
      );
      const result = pokemosData.map((pokemon: any) => {
        return {
          name: pokemon.name,
          id: pokemon.id,
          image: pokemon.sprites.other['official-artwork'].front_default,
          types: pokemon.types.map((type: any) => type.type.name),
        };
      });
      setPokemons([...pokemons, ...result]);
    })();
  }, [filter.cant, filter.page]);

  const fetchMoreData = () => {
    setFilter({ cant: 30, page: filter.page + 1 });
    console.log('acctualiza');
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={pokemons.length || 0}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className='gap-4 grid grid-cols-link-card'>
          {pokemons.length > 0 &&
            pokemons?.map((pokemon) => (
              <ReactCard
                key={pokemon.id}
                image={pokemon.image}
                title={pokemon.name}
                body='holap'
                types={pokemon.types}
              />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

//   fetchMoreData = () => {
//     // a fake async api call like which sends
//     // 20 more records in 1.5 secs
//     setTimeout(() => {
//       this.setState({
//         items: this.state.items.concat(Array.from({ length: 20 }))
//       });
//     }, 1500);
//   };

// }
