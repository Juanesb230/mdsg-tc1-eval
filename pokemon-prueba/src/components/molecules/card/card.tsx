import React from 'react'
import './card.scss'

import { Pokemon } from '../../../utils/interfaces/Pokemons'

export interface CardProps {
    card: Pokemon
}

export const Card: React.FC<CardProps> = ({card}) => {
  return (
    <>
        <div className='card' data-testid="card">
            <h3 className='card__name'>{card.name}</h3>
            <div className='card__container'>
                <img className='card__container__gif' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${card.url.split('/').at(-2)}.svg`} alt={`Card #${card.id}`} />
            </div>
        </div>
    </>
  )
}
