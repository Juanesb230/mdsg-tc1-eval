import { useCallback, useEffect, useState } from 'react'
import { Card } from '../../molecules/card/card'
import { PokemonService } from '../../../services/pokemon/pokemons'
import './card-list.scss'
import { useAppContext } from '../../../context/app-context'

const CardList = () => {
    const { pokemonReducer } = useAppContext()
    const { pokemonState, pokemonDispatch } = pokemonReducer
    const { pokemons } = pokemonState
    const [limitIncrement, setLimitIncrement] = useState(+50)
    const [offsetIncrement, setOffsetIncrement] = useState(+50)
    
    const getPokemons = useCallback(async () => {
        try {
            const data = await PokemonService.getPokemons('20', '0')
            const datos = data
            console.log("daiii", datos);
            
            pokemonDispatch({ type: 'getPokemons', payload: datos})
        } catch (e) {
            console.log('error', e);
        }
    }, [pokemonDispatch])

    const handleOnScroll = useCallback(async () => {
        try {
            //let limitIncrement =+50;
           
            //let offsetIncrement = + 50;
            const data = await PokemonService.getPokemonsOffset(limitIncrement, offsetIncrement)
            const datos = data
            //console.log("daiii", datos);
            
            pokemonDispatch({ type: 'getPokemonsOffset', payload: datos})
        } catch (e) {
            console.log('error', e);
        }
    }, [pokemonDispatch])

    useEffect(() => {
        getPokemons()
        window.addEventListener('scroll', handleOnScroll)
        return () => {
          window.removeEventListener('scroll', handleOnScroll)
        }
    
    }, [getPokemons])
    
    return (
        <div className='card-list'>
            {
                pokemons.length === 0 && (
                    <div className='card-list__not-found'>
                        <p className='card-list__not-found__message'>No existe ningún pokemon con ese nombre</p>
                    </div>
                )
            }
            {
                pokemons.map((card, index) => (
                    <div className='card-list__cards' key={index}>
                        <Card 
                            card={card}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default CardList;
