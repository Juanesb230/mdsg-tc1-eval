import { useCallback, useEffect, useState } from "react";
import { Pokemon, PokemonWithImage } from "../../../../util/interfaces/Pokemon";
import axios from "axios";

const UseScroll = () => {
  const [fetches, setFetches] = useState<number>(1);
  const [data, setData] = useState<PokemonWithImage[]>([]);

  useEffect(() => {
    refetch();
  }, []);
  const refetch = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${20 * fetches}&offset=0`
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
  }, [fetches]);

  const handleOnScroll = useCallback(() => {
    const screensScrolled = Math.ceil(window.scrollY / window.innerHeight);

    if (fetches < screensScrolled) {
      setFetches(screensScrolled);
      refetch();
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
