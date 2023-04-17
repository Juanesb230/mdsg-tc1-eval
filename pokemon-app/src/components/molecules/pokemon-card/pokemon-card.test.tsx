import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonCard from "./pokemon-card";


describe("PokemonCard", () => {
  it("should render the pokemon card", () => {
    render(<PokemonCard name="bulbasaur" url="https://pokeapi.co/api/v2/pokemon/1/" />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("should call the onClick function when clicked", () => {
    const onClick = jest.fn();
    render(<PokemonCard name="bulbasaur" url="https://pokeapi.co/api/v2/pokemon/1/" onClick={onClick} />);
    userEvent.click(screen.getByText("bulbasaur"));
    expect(onClick).toHaveBeenCalled();
  });
}