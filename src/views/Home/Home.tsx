import React from 'react';
import styles from './styles/Home.module.scss';
import { InputSeacrh } from '@/components/atoms/InputSeacrh';

import { ReadPokemon } from '@/models';
import { CardCustom } from '@/components/atoms/CardCustom';
import { useEffectPokemons } from './useEffects/pokemon';

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const {
    data: pokemons,
    isLoading,
    error,
    handleScroll,
    pokemonFiltered,
  } = useEffectPokemons();
  if (isLoading) {
    return <div className={styles.home__containerState}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.home__containerState}>Error: {error.message}</div>
    );
  }

  if (!pokemons) {
    return null;
  }
  return (
    <div
      onScroll={handleScroll}
      style={{ height: '100vh', overflowY: 'scroll' }}
      className={styles.home}
    >
      <header className={styles.home__header}>
        <h1>Pokemons Totales: {pokemons?.numberPokemons}</h1>
        <InputSeacrh
          onChange={pokemonFiltered}
          placeholder='busca tu pokemon aqui'
          forHtml='Buscar'
        ></InputSeacrh>
      </header>
      {pokemons.pokemons.length === 0 ? (
        <div className={styles.home__notFountSearch}>
          No existe ningun pokemon con este nombre!
        </div>
      ) : (
        <section className={styles.home__grid}>
          {pokemons?.pokemons.map((pokemon: ReadPokemon) => (
            <CardCustom key={pokemon.id} pokemon={pokemon}></CardCustom>
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;
