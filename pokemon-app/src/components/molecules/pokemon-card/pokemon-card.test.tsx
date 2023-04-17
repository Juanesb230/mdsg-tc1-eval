import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonCard from "./pokemon-card";


describe ("PokemonCard", () => {
  it("should render a pokemon card", () => {
    render(<PokemonCard pokemon={{name: "bulbasaur", url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}}/>);
    expect(screen.getByTestId("pokemoncard-testid")).toBeInTheDocument();
  });
});