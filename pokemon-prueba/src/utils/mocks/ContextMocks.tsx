import { FC } from 'react'
import { PokemonState } from '../../context/use-pokemon/use-pokemon'
import AppContext from '../../context/app-context'

import usePokemons from '../../context/use-pokemon/use-pokemon'

export interface ContextMockProps {
  values?: PokemonState
  children: React.ReactNode
}

const ContextMock: FC<ContextMockProps> = ({ values, children }) => {
  const pokemonReducer = usePokemons(values)

  const store = {
    pokemonReducer
  }

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}

export default ContextMock