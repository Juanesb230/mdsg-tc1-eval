import { render, screen, waitFor } from "@testing-library/react";
import PokemonList from "./pokemon-list";
import ContextMock from "../../../utils/mocks/context-mock";
import { pokemonsMocks } from "../../../utils/mocks/pokemons-mock";
import axiosMock from "../../../utils/mocks/axios-mock";

describe("App component", () => {
  it("Should render not found", () => {
    render(
      <ContextMock values={{pokemons:[]}}>
        <PokemonList/>
      </ContextMock>
    );

    const title = screen.getByText("No Existen Pokemons");
    expect(title).toBeInTheDocument();
  });

  it("Should render pokemons", async() => {
    axiosMock.get.mockResolvedValueOnce(pokemonsMocks)
    render(
      <ContextMock values={{pokemons: []}}>
        <PokemonList/>
      </ContextMock>
    );

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(3);
    })
    
  });

});