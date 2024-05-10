import { useEffect, useRef, type KeyboardEventHandler } from 'react';
import { useStore } from '@nanostores/react';
import { getPokemon } from '../config/api/backend/pokemon';
import { $filter, $pokemons, setFilter, setPokemon } from '../shared';
import type { APIPokemon } from '../types';
import { getPokemons } from '../config/api/backend/pokemons';
export const SearchInput = () => {
  const searchinput = useRef({} as HTMLInputElement);
  const filter = useStore($filter);
  const pokemons = useStore($pokemons);

  const handleSearch = async () => {
    let pokemon: APIPokemon | APIPokemon[];
    const pokemonString = (
      searchinput.current as HTMLInputElement
    ).value.trim();
    if (pokemonString) {
      setPokemon([]);
      const pokemon = await getPokemon(pokemonString);
      pokemon ? setPokemon([pokemon]) : setPokemon(undefined);
    } else {
      if (filter.page === 0) {
        setPokemon([]);
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

        setPokemon([...pokemosData]);
      } else {
        setFilter({ cant: 30, page: 0 });
        setPokemon([]);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (pokemons?.length === 1) {
        setFilter({ cant: 30, page: 0 });
      }
    };
  }, [pokemons?.length]);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleEnter: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      submitButtonRef.current?.click();
    }
  };
  return (
    <div>
      <label
        htmlFor='search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
      >
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          ref={searchinput}
          type='search'
          id='search'
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search'
          required
          onKeyDown={handleEnter}
        />
        <button
          ref={submitButtonRef}
          onClick={handleSearch}
          type='submit'
          className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Search
        </button>
      </div>
    </div>
  );
};
