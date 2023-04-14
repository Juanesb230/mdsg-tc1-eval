import React from 'react';
import styles from './styles/CardCustom.module.scss';
import { ReadPokemon } from '@/models';
export interface CardCustomProps {
  pokemon: ReadPokemon;
}

const CardCustom: React.FC<CardCustomProps> = ({ pokemon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__body}>
        <h2>{pokemon.name}</h2>
      </div>
      <div className={styles.card__img}>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
    </div>
  );
};

export default CardCustom;
