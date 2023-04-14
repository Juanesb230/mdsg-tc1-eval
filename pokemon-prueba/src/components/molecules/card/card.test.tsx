import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./card";
import ContextMock from "../../../utils/mocks/ContextMocks";
import axiosMock from "../../../utils/mocks/axiosMocks";
import { pokemonsMocks } from "../../../utils/mocks/pokemonsMocks";

describe("App component", () => {
  it("Should render card", () => {
    render(
      <ContextMock values={{pokemons:[]}}>
        <Card card={pokemonsMocks.data[0]}/>
      </ContextMock>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument()
  });

});