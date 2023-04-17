import { FC } from "react";
import Pokemon from "../../../utils/interfaces/pokemon";

import "./pokemon-card.scss";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="pokemon-card" data-testid="pokemoncard-testid">
      <h3 className="pokemon-card__name">{pokemon.name}</h3>
      <img
        src={pokemon.url}
        className={`pokemon-card__image `}
        alt={`${pokemon.name}`}
      />
    </div>
  );
};

export default PokemonCard;
