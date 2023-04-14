import { FC } from "react";
import UseScroll from "./use-scroll/use-scroll";
import React from "react";

export interface ScrollProps {
  filter: string;
}

const Scroll: FC<ScrollProps> = ({ filter }) => {
  const { data } = UseScroll();
  return (
    <section>
      {" "}
      {data.map((pokemon) => (
        <article>
          {pokemon.name}
          <img src={pokemon.img} alt="" />
        </article>
      ))}
    </section>
  );
};

export default Scroll;
