import { useReducer } from "react";
import { Pokemon } from "../../utils/interfaces/Pokemons"

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
    | {
        type: 'getPokemonsOffset'
        payload: Pokemon[]
    }

export const INITIAL_STATE = {
    pokemons: []
}

const pokemonsReducer = ( state: PokemonState, action: PokemonReducerAction): PokemonState => {
    switch (action.type) {
        case 'getPokemons': 
            return {
                ...state, 
                pokemons: action.payload
            }
        case 'findPokemons': 
            return {
                ...state, 
                pokemons: action.payload
                //pokemons: state.pokemons.filter((p) => p.name === action.payload)
            }
        case 'getPokemonsOffset': 
            return {
                ...state, 
                pokemons: action.payload
            }
    }
}

const usePokemons = (initialState?: PokemonState) =>{
    const [ pokemonState, pokemonDispatch ] = useReducer(pokemonsReducer, initialState ?? INITIAL_STATE)
    return { pokemonState, pokemonDispatch}
}

export default usePokemons
export type PokemonHook = ReturnType<typeof usePokemons>