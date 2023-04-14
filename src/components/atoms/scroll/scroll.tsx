import { FC, useEffect, useState } from "react";
import UseScroll from "./use-scroll/use-scroll";
import Card from "../card/card";
import "./scroll.scss";
import { PokemonWithImage } from "../../../util/interfaces/Pokemon";
export interface ScrollProps {
  filter: string;
}

const Scroll: FC<ScrollProps> = ({ filter }) => {
  const { data } = UseScroll();
  const [filteredData, setFilteredData] = useState<PokemonWithImage[]>([]);

  useEffect(() => {
    if (filter === "") setFilteredData(data);
    setFilteredData(data.filter((pokemon) => pokemon.name.includes(filter)));
  }, [filter, data]);

  return (
    <section className="scroll">
      {filteredData.map((pokemon) => (
        <Card pokemon={pokemon} key={pokemon.name} />
      ))}
      {!filteredData.length && <span>No existe un pokemon con ese nombre</span>}
    </section>
  );
};

export default Scroll;
