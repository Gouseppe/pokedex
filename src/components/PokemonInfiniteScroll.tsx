import { useEffect, useRef, useState } from "react";
import { ReactCard } from "./ReactCard";
import { getPokemons } from "../config/api/backend/pokemons";
import {
  $filter,
  $pokemon,
  $pokemons,
  setFilter,
  setPokemons,
  $isCharging,
} from "../shared";
import { useStore } from "@nanostores/react";
import { Charging } from "./Charging";
import { getPokemon } from "../config/api/backend/pokemon";

export const PokemonInfiniteScroll = () => {
  const isCharging = useStore($isCharging);
  const pokemons = useStore($pokemons);
  const pokemon = useStore($pokemon);
  const filter = useStore($filter);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const queueRef = useRef<Promise<void>>(Promise.resolve());
  const sentinelRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    queueRef.current = queueRef.current
      .then(async () => {
        const current = $pokemons.get() ?? [];
        const expected = filter.cant * (filter.page + 1);
        if (!hasMore || current.length >= expected) return;

        busyRef.current = true;
        setIsFetching(true);
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
        } finally {
          busyRef.current = false;
          setIsFetching(false);
        }
      })
      .catch(() => {});
  }, [filter.cant, filter.page, hasMore]);

  useEffect(() => {
    console.log("is charging");
  }, [isCharging]);

  const updateFilter = () => {
    setFilter({ ...filter, page: filter.page + 1 });
  };

  // Dispara la siguiente página cuando el centinela entra al viewport.
  // Cubre ambos casos sin medir scrollHeight: scroll hasta el fondo y
  // pantallas más altas que el contenido (el centinela ya es visible).
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if ((pokemons?.length || 0) === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some((entry) => entry.isIntersecting) &&
          !busyRef.current &&
          hasMore
        ) {
          updateFilter();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pokemons, hasMore, pokemon]);

  return (
    <div>
      {isCharging ? (
        <Charging />
      ) : pokemon === null ? (
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
        <>
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
          {isFetching && hasMore && <Charging />}
          <div ref={sentinelRef} aria-hidden="true" />
        </>
      )}
    </div>
  );
};
