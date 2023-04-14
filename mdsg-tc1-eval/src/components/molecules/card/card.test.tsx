import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./card";
import ContextMock from "../../../utils/mocks/context-mock";
import axiosMock from "../../../utils/mocks/axios-mock";
import { pokemonsMocks } from "../../../utils/mocks/pokemons-mock";

describe("App component", () => {
  it("Should render card", () => {
    render(
      <ContextMock values={{pokemons:[]}}>
        <Card card={pokemonsMocks.data[0]}/>
      </ContextMock>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument()
  });

  it("Should open modal", async () => {
    render(
      <ContextMock values={{pokemons:pokemonsMocks.data}}>
        <Card card={pokemonsMocks.data[0]}/>
      </ContextMock>
    );

    await fireEvent.click(screen.getByAltText('Delete icon'))
    expect(screen.getByText('Deseas eliminar este GIF?')).toBeInTheDocument()
  });

  it("Should delete card", async () => {
    axiosMock.delete.mockResolvedValueOnce(pokemonsMocks.data[0])
    render(
      <ContextMock values={{pokemons:pokemonsMocks.data}}>
        <Card card={pokemonsMocks.data[0]}/>
      </ContextMock>
    );

    await fireEvent.click(screen.getByAltText('Delete icon'))
    expect(screen.getByText('Deseas eliminar este GIF?')).toBeInTheDocument()
    await fireEvent.click(screen.getByText('Eliminar'))
    expect(axiosMock.delete).toBeCalled()
  });

  it("Should cancel delete", async () => {
    axiosMock.delete.mockResolvedValueOnce(pokemonsMocks.data[0])
    render(
      <ContextMock values={{pokemons: pokemonsMocks.data}}>
        <Card card={pokemonsMocks.data[0]}/>
      </ContextMock>
    );

    await fireEvent.click(screen.getByAltText('Delete icon'))
    expect(screen.getByText('Deseas eliminar este GIF?')).toBeInTheDocument()
    await fireEvent.click(screen.getByText('Cancelar'))
    expect(screen.queryByText('Deseas eliminar este GIF?')).not.toBeInTheDocument()
  });
});