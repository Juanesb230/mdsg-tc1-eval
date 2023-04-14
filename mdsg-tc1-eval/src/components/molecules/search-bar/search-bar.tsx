import Input from '../../atoms/input/input'
import { FC, useState, useCallback } from 'react'
import { useAppContext } from '../../../context/app-context'
import './search-bar.scss'
import { PokemonService } from '../../../services/pokemon-service/pokemon-service'

interface SearchBarProps {
    text?: string,
    setSearchedPokemon: (value: string) => void
}
const SearchBar: FC<SearchBarProps> = ({text, setSearchedPokemon}) => {
  const { pokemonReducer } = useAppContext()
  const { pokemonState, pokemonDispatch} = pokemonReducer
  const { pokemons } = pokemonState

  const findPokemons = useCallback(async (value:string) => {
    try {
      const data = await PokemonService.findPokemons(value)
      pokemonDispatch({ type: 'findPokemons', payload: data })
    }catch(e) {
    }
  }, [pokemonDispatch])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    setSearchedPokemon(value)
    findPokemons(value)
  }
 
 return (
    <section className="search">
      <div className="search__label">
        <label>{text}</label>
        <span>{pokemons.length}</span>
      </div>
      <div className="search__input">
        <Input
          placeholder="Buscar Pokemon"
          type="text"
          onChange={onChange}
        ></Input>
      </div>
    </section>
  )
}
export default SearchBar
