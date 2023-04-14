import { FC } from "react";
import { PokemonWithImage } from "../../../util/interfaces/Pokemon";
import './card.scss'

export interface CardProps {
  pokemon: PokemonWithImage;
}

const Card: FC<CardProps> = ({ pokemon }) => {
  return (
    <article className="card">
      <span className="card__text">{pokemon.name}</span>
      <img src={pokemon.img} alt="pokemon" className="card__img" />
    </article>
  );
};

export default Card;
