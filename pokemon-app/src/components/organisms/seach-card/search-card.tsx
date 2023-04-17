import React, { useState } from 'react'
import  usePokemons  from '../../organisms/pokemon-list/use-pokemon-list/use-pokemon-list'
import { PokemonService } from '../../../services/pokemon/pokemons'
import Input from '../../atoms/input/input'

const SearchCard = () => {

    const { pokemonReducer } = usePokemons()
    const { pokemonDispatch } = pokemonReducer
    const [nameInput, setNameInput] = useState('')

    const onFindPokemon = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        const data = await PokemonService.findPokemons(nameInput)
        pokemonDispatch({ type: 'findPokemons', payload: data })
        setNameInput(value)
    }

    return (
        <div className='search-card'>
            <Input value={nameInput} onChange={onFindPokemon} placeholder="Buscar pokemons" />
        </div>
    )
}

export default SearchCard
