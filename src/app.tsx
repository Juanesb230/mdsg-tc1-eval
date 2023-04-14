import { observer } from "mobx-react";
import "./app.scss";
import { SearchBar } from "./components/molecules/searchBar/searchBar";
import React, { useEffect, useCallback } from "react";
import store from "./store/store";
import { Card } from "./components/organisms/Card/Card";

const App: React.FC = observer(() => {
  useEffect(() => {
    store.getAllPokemons(0);
  }, []);

  const handleChange = (filterWord: string) => {
    store.filterPokemons(filterWord);
  };

  const handleOnScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      store.getMorePokemons(store.page + 50);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [handleOnScroll]);

  return (
    <main className="app">
      <section className="app__title">
        <SearchBar handleChange={handleChange} counter={store.counter} />
      </section>

      <section className="app__pokemons">
        {store.filteredPokemons?.map(poke => (
          <Card name={poke.name} url={poke.url} key={poke.url + Math.random()} />
        ))}
        {store.filteredPokemons?.length === 0 && <p>No existe ningun pokemon con ese nombre</p>}
      </section>
    </main>
  );
});

export default App;
