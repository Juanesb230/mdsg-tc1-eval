import { ReadPokemon, ReadPokemonDetail } from '@/models';
import { ApiResponse } from '@/models/api-response.model';
import { useCustomState } from '@/utils/customState';
import { useEffect } from 'react';

export const useEffectPokemons = (): ApiResponse<ReadPokemonDetail> => {
  const [nextPageUrl, setNextPageUrl] = useCustomState<string | null>(null);
  const [pokemons, setPokemos] = useCustomState<ReadPokemonDetail>({
    numberPokemons: 0,
    pokemons: [],
  });

  const [pokemonsFilter, setPokemosFilter] = useCustomState<ReadPokemonDetail>({
    numberPokemons: 0,
    pokemons: [],
  });
  const [isLoading, setIsLoading] = useCustomState<boolean>(false);
  const [error, setError] = useCustomState<Error | null>(null);

  const pokemonFiltered = (termino: any) => {
    console.log(termino.target?.value);
    termino = termino.target?.value.trim().toLowerCase();
    if (termino !== '') {
      const pokemonFilter = pokemons.pokemons.filter((pokemon: ReadPokemon) => {
        const name = pokemon.name.toLowerCase();
        return name.includes(termino);
      });

      const pokemonsDetails: ReadPokemonDetail = {
        numberPokemons: pokemons.numberPokemons,
        pokemons: pokemonFilter,
      };
      //   pokemons.pokemons = pokemonFilter;
      setPokemosFilter(pokemonsDetails);
    } else {
      setPokemosFilter(pokemons);
    }
  };
  const loadMore = async () => {
    if (nextPageUrl) {
      const response = await fetch(nextPageUrl);
      const data = await response.json();
      const { results } = data;
      const pokemonsArr: ReadPokemon[] = results.map(async (pokemon: any) => {
        const response = await fetch(pokemon.url);
        const poke = await response.json();
        const pokemonApi: ReadPokemon = {
          image: poke.sprites.other.dream_world.front_default,
          name: pokemon.name,
          url: pokemon.url,
          id: poke.id,
        };
        return pokemonApi;
      });
      const pokemonsDetails: ReadPokemonDetail = {
        numberPokemons: data.count,
        pokemons: [...pokemons.pokemons, ...(await Promise.all(pokemonsArr))],
      };
      setPokemos(pokemonsDetails);
      setPokemosFilter(pokemonsDetails);
      setNextPageUrl(data.next);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    console.log(event.currentTarget);
    const element = event.currentTarget;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      loadMore();
    }
  };
  useEffect(() => {
    async function fetchPokemons() {
      setIsLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`
      );

      try {
        const data = await response.json();
        const { results } = data;
        const pokemons: ReadPokemon[] = results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const poke = await response.json();
          const pokemonApi: ReadPokemon = {
            image: poke.sprites.other.dream_world.front_default,
            name: pokemon.name,
            url: pokemon.url,
            id: poke.id,
          };
          return pokemonApi;
        });
        const pokemonsDetails: ReadPokemonDetail = {
          numberPokemons: data.count,
          pokemons: await Promise.all(pokemons),
        };
        setPokemos(pokemonsDetails);
        setPokemosFilter(pokemonsDetails);
        setNextPageUrl(data.next);
      } catch (error: any) {
        setError(error);
      }
      setIsLoading(false);
    }

    fetchPokemons();

    // Devolver una función de limpieza
    return () => {
      setPokemos({ numberPokemons: 0, pokemons: [] });
      console.log(`Cleaned up `);
    };
  }, []);
  return {
    data: pokemonsFilter,
    isLoading,
    error,
    handleScroll,
    pokemonFiltered,
  };
};
