import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonList from "./pokemon-list";

describe("PokemonList", () => {
  it("should render a pokemon list", () => {
    render(<PokemonList />);
    expect(screen.getByTestId("pokemonlist-testid")).toBeInTheDocument();
  });
});

