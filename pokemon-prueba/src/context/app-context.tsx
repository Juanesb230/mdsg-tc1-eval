import React, { createContext, useContext } from 'react'
import { INITIAL_STATE as pokemonInitialState, PokemonHook} from './use-pokemon/use-pokemon'
import usePokemons from './use-pokemon/use-pokemon'

interface AppContentHooks {
    pokemonReducer: PokemonHook
}

const AppContext = createContext<AppContentHooks>({
    pokemonReducer: { pokemonState: pokemonInitialState, pokemonDispatch: () => {} }
})

export const useAppContext = () => useContext(AppContext)

interface ProviderProps {
    children: React.ReactNode
}

export const AppContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const pokemonReducer = usePokemons()

    const store = {
        pokemonReducer
    }

    return <AppContext.Provider value={store}>{children}</AppContext.Provider> 
}

export default AppContext