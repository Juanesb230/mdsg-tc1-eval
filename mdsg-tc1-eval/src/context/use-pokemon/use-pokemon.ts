import { useReducer } from 'react'
import { Pokemon } from '../../utils/interfaces/pokemon'

export interface PokemonState {
  pokemons: Pokemon[]
}

type PokemonReducerAction =
  | {
      type: 'getPokemons'
      payload: Pokemon[]
    }
  | {
      type: 'findPokemons'
      payload: Pokemon[]
    }

export const INITIAL_STATE = {
  pokemons: [],
}

const pokemonsReducer = (state: PokemonState, action: PokemonReducerAction): PokemonState => {
  switch (action.type) {
    case 'getPokemons':
      return {
        ...state,
        pokemons: action.payload,
      }
    case 'findPokemons':
      return {
        ...state,
        pokemons: action.payload,
      }
  }
}

const usePokemons = (initialState?: PokemonState) => {
  const [pokemonState, pokemonDispatch] = useReducer(pokemonsReducer, initialState ?? INITIAL_STATE)
  return { pokemonState, pokemonDispatch }
}

export default usePokemons
export type PokemonHook = ReturnType<typeof usePokemons>