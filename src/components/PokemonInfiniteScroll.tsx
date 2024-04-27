import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { APIPokemon, PokemonTypes } from '../types';
import { ReactCard } from './ReactCard';
import { getPokemons } from '../config/api/backend/pokemons';

export const PokemonInfiniteScroll = () => {
  const [pokemons, setPokemons] = useState<APIPokemon[]>([]);

  const [filter, setFilter] = useState<{ cant: number; page: number }>({
    cant: 30,
    page: 0,
  });

  useEffect(() => {
    (async () => {
      const pokemonsUrl = await getPokemons(
        filter.cant,
        filter.page * filter.cant
      );
      const pokemosData: APIPokemon[] = await Promise.all(
        pokemonsUrl.map(async (pokemon: { url: RequestInfo | URL }) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return data;
        })
      );
      setPokemons([...pokemons, ...pokemosData]);
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
        <div className='gap-4 grid grid-cols-link-card justify-items-center'>
          {pokemons.length > 0 &&
            pokemons?.map((pokemon) => (
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
