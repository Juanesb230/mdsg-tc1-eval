import React from "react";
import { Button } from "../../atoms/button/Button";
import { Input } from "../../atoms/input/Input";
import "./searchBar.scss";

interface SearchProps {
  handleChange: (value: string) => void;
  counter: number;
}

export const SearchBar: React.FC<SearchProps> = ({ handleChange, counter }) => {
  return (
    <div className="searchBar-container">
      <Input
        placeholder="buscar pokemon"
        width="100%"
        inputId="buscar"
        onChange={handleChange}
        numberPokemon={counter}
      />
    </div>
  );
};
