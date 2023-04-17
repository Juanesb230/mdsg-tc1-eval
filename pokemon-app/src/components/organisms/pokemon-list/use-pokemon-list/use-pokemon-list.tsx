import { useReducer } from "react";
import Pokemon from "../../../../utils/interfaces/pokemon";

export interface PokemonState {
  pokemons: Pokemon[];
}

type PokemonReducerAction =
  | {
      type: "getPokemons";
      payload: Pokemon[];
    }
  | {
      type: "findPokemons";
      payload: string;
    }
  | {
      type: "getPokemonsOffset";
      payload: Pokemon[];
    };

export const INITIAL_STATE: PokemonState = {
  pokemons: [],
};

const pokemonsReducer = (
  state: PokemonState,
  action: PokemonReducerAction
): PokemonState => {
  switch (action.type) {
    case "getPokemons":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "findPokemons":
      return {
        ...state,
        pokemons: state.pokemons.filter((p) =>
          p.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "getPokemonsOffset":
      return {
        ...state,
        pokemons: action.payload,
      };
    default:
      return state;
  }
};

const usePokemons = (initialState: PokemonState = INITIAL_STATE) => {
  const [pokemonState, pokemonDispatch] = useReducer(
    pokemonsReducer,
    initialState
  );
  return { pokemonState, pokemonDispatch };
};

export default usePokemons;
export type PokemonHook = ReturnType<typeof usePokemons>;
