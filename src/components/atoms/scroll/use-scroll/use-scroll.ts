import { useCallback, useEffect, useState } from "react";
import { Pokemon, PokemonWithImage } from "../../../../util/interfaces/Pokemon";
import axios from "axios";

const UseScroll = () => {
  const [fetches, setFetches] = useState<number>(1);
  const [data, setData] = useState<PokemonWithImage[]>([]);

  useEffect(() => {
    refetch(1);
  }, []);
  const refetch = useCallback(async (limit: number) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${50 * limit}&offset=0`
      );
      const pokemons = data.results as Pokemon[];
      const pokemonsWithImg: PokemonWithImage[] = pokemons.map((pokemon) => ({
        ...pokemon,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
          pokemon.url
            .split("https://pokeapi.co/api/v2/pokemon/")[1]
            .split("/")[0]
        }.svg`,
      }));
      setData(pokemonsWithImg);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleOnScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) + 80 >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setFetches((fetches) => fetches + 1);
      refetch(fetches + 1);
    }
  }, [fetches, refetch]);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [handleOnScroll, refetch]);
  return { data };
};
export default UseScroll;
