import React, { useState } from 'react';
import { AppContextProvider } from "./context/app-context";
import PokemonList from "./components/organisms/pokemon-list/pokemon-list";
import SearchBar from "./components/molecules/search-bar/search-bar";
import './App.scss';

function App() {
  const [searchedPokemon, setSearchedPokemon] = useState('')
  return (
    <AppContextProvider>
      <div className="app">
        <SearchBar text='Pokemons Totales: ' setSearchedPokemon={setSearchedPokemon}/>
        <PokemonList searchedPokemon={searchedPokemon}/>
      </div>
    </AppContextProvider>
  );
}

export default App;
