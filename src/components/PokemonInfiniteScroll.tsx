import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { APIPokemon, PokemonTypes } from "../types";
import { ReactCard } from "./ReactCard";
import { getPokemonsData } from "../config/api/backend/pokemons";
import {
  $filter,
  $pokemon,
  $pokemons,
  setFilter,
  setPokemons,
} from "../shared";
import { useStore } from "@nanostores/react";
import { Charging } from "./Charging";
import type { PokemonDeno } from "../types/api/deno-api";

export const PokemonInfiniteScroll = () => {
  const pokemons = useStore($pokemons);
  const pokemon = useStore($pokemon);
  const filter = useStore($filter);

  useEffect(() => {
    (async () => {
      if (pokemons?.length !== filter.cant * (filter.page + 1)) {
        const pokemonsData = await getPokemonsData(
          filter.cant,
          filter.page * filter.cant
        );

        console.log("pokemonsData", pokemonsData);
        setPokemons([...(pokemons as PokemonDeno[]), ...pokemonsData]);
      }
    })();
  }, [filter.cant, filter.page]);

  const updateFilter = () => {
    setFilter({ cant: 10, page: filter.page + 1 });
  };

  // Si la página no genera scrollbar (pantalla muy alta), seguir solicitando
  // más elementos hasta que haya scroll o no queden más datos.
  useEffect(() => {
    if (pokemons?.length === 0) return;
    if (typeof window === "undefined") return;

    setTimeout(() => {
      const doc = document.documentElement || document.body;
      const needsMore = doc.scrollHeight <= window.innerHeight;
      if (needsMore) {
        // Evitar peticiones infinitas: comprobar que ya existe al menos un elemento
        if ((pokemons?.length || 0) > 0) {
          updateFilter();
        }
      }
    }, 500);
  }, [pokemons]);

  return (
    <div>
      {pokemon === null ? (
        <p className="text-center">
          El pokemon que esta buscando no se encuentra
        </p>
      ) : pokemon ? (
        <div className="gap-4 grid grid-cols-cards justify-items-center">
          <ReactCard
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.sprites.other["official-artwork"].front_default}
            title={pokemon.name}
            types={pokemon.types.map((type: any) => type.type.name)}
          />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={pokemons?.length || 0}
          next={updateFilter}
          hasMore={true}
          loader={<Charging />}
        >
          <div className="gap-4 grid grid-cols-cards justify-items-center">
            {pokemons?.map((pokemon) => (
              <ReactCard
                key={pokemon.id}
                id={pokemon.id}
                image={pokemon.imageUrl}
                title={pokemon.name.toLowerCase()}
                types={pokemon.types.map((type) => type.toLowerCase() as any)}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};
