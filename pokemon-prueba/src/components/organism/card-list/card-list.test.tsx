import { render, screen, waitFor } from "@testing-library/react";
import CardList from "./card-list";
import ContextMock from "../../../utils/mocks/ContextMocks";
import { pokemonsMocks } from "../../../utils/mocks/pokemonsMocks";
import axiosMock from "../../../utils/mocks/axiosMocks";

describe("App component", () => {
  it("Should render not found", () => {
    render(
      <ContextMock values={{pokemons:[]}}>
        <CardList/>
      </ContextMock>
    );

    const title = screen.getByText("No existe ningún pokemon con ese nombre");
    expect(title).toBeInTheDocument();
  });

  it("Should render pokemons", async() => {
    axiosMock.get.mockResolvedValueOnce(pokemonsMocks)
    render(
      <ContextMock values={{pokemons: []}}>
        <CardList/>
      </ContextMock>
    );

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(3);
    })
    
  });

});