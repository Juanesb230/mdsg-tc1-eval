import { getId, getUrl } from '../../../utils/functions/functions';
import { Pokemon } from '../../../utils/interfaces/pokemon';

import './card.scss'

export interface CardProps {
  card: Pokemon
}

const Card: React.FC<CardProps> = ({ card }) => {
  const pokemonId = getId(card.url)
  const pokemonUrl = getUrl(pokemonId)
 
  return (
    <>
      <div className="card" data-testid="card">
        <p className="card__name">{card.name}</p>
        <img className="card__pokemon" src={pokemonUrl} alt={`Card #${card.name}`} />
      </div>
    </>
  )
}

export default Card