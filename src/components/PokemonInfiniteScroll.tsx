import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ReactCard } from "./ReactCard";
import { getPokemons } from "../config/api/backend/pokemons";
import {
  $filter,
  $pokemon,
  $pokemons,
  setFilter,
  setPokemons,
} from "../shared";
import { useStore } from "@nanostores/react";
import { Charging } from "./Charging";
import { getPokemon } from "../config/api/backend/pokemon";

export const PokemonInfiniteScroll = () => {
  const pokemons = useStore($pokemons);
  const pokemon = useStore($pokemon);
  const filter = useStore($filter);
  const [hasMore, setHasMore] = useState(true);
  const queueRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    queueRef.current = queueRef.current
      .then(async () => {
        const current = $pokemons.get() ?? [];
        const expected = filter.cant * (filter.page + 1);
        if (!hasMore || current.length >= expected) return;

        try {
          const offset = filter.page * filter.cant;
          const pokemonsUrl = await getPokemons(filter.cant, offset);
          if (pokemonsUrl.length === 0) {
            setHasMore(false);
            return;
          }
          const settled = await Promise.all(
            pokemonsUrl.map(async (pokemon: { name: string }) => {
              try {
                return await getPokemon(pokemon.name);
              } catch {
                return null;
              }
            }),
          );
          const byId = new Map(current.map((p) => [p.id, p]));
          for (const p of settled) {
            if (p !== null) byId.set(p.id, p);
          }

          if (byId.size > 0) {
            setPokemons([...byId.values()]);
          }
          if (pokemonsUrl.length < filter.cant) setHasMore(false);
        } catch (error) {
          console.error("Error cargando pokemons:", error);
        }
      })
      .catch(() => {});
  }, [filter.cant, filter.page, hasMore]);

  const updateFilter = () => {
    setFilter({ ...filter, page: filter.page + 1 });
  };

  // Si la página no genera scrollbar (pantalla muy alta), seguir solicitando
  // más elementos hasta que haya scroll o no queden más datos.
  useEffect(() => {
    if ((pokemons?.length || 0) === 0) return;
    if (!hasMore) return;
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      const doc = document.documentElement || document.body;
      const needsMore = doc.scrollHeight <= window.innerHeight;
      if (needsMore) {
        updateFilter();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [pokemons, hasMore]);

  return (
    <div>
      {pokemon === null ? (
        <p className="text-center">
          El pokemon que esta buscando no se encuentra
        </p>
      ) : pokemon ? (
        <div className="gap-4 grid grid-cols-link-card justify-items-center">
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
          hasMore={hasMore}
          loader={<Charging />}
        >
          <div className="gap-4 grid grid-cols-cards justify-items-center">
            {pokemons?.map((pokemon) => (
              <ReactCard
                key={pokemon.id}
                id={pokemon.id}
                image={pokemon.sprites.other["official-artwork"].front_default}
                title={pokemon.name}
                types={pokemon.types.map((type: any) => type.type.name)}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};
