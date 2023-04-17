import { useCallback, useEffect, useState } from "react";
import PokemonCard from "../../molecules/pokemon-card/pokemon-card";
import PokemonService from "../../../services/pokemon-service";
import "./card-list.scss";
import usePokemons from "./use-pokemon-list/use-pokemon-list";

const CardList = () => {
  const { pokemonReducer } = usePokemons();
  const { pokemonState, pokemonDispatch } = pokemonReducer;
  const { pokemons } = pokemonState;

  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const loadPokemons = useCallback(async () => {
    try {
      const data = await PokemonService.getPokemons(limit, offset);
      const pokemonsData = data.results;

      pokemonDispatch({ type: "getPokemons", payload: pokemonsData });
    } catch (e) {
      console.log("Error", e);
    }
  }, [limit, offset, pokemonDispatch]);

  const handleScroll = useCallback(async () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  }, []);

  useEffect(() => {
    loadPokemons();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadPokemons, handleScroll]);

  return (
    <div className="card-list">
      {pokemons.length === 0 && (
        <div className="card-list__not-found">
          <p className="card-list__not-found__message">
            No existe ningún pokemon con ese nombre
          </p>
        </div>
      )}
      {pokemons.map((pokemon, index) => (
        <div className="card-list__cards" key={index}>
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
