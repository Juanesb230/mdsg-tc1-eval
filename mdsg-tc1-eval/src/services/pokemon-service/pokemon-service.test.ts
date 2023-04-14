import axios from "axios";
import { PokemonService } from "./pokemon-service";
import { pokemonsMocks } from "../../utils/mocks/pokemons-mock";

describe("Pokemon service", () => {

  it("should return a array when the getPokemons service resposes ok", async () => {
    const mockGetPokemons = jest.spyOn(axios, "get").mockResolvedValue({
      data: pokemonsMocks,
    });

    const response = await PokemonService.getPokemons('50','3');

    expect(mockGetPokemons).toBeCalled();
    expect(response).toEqual(pokemonsMocks);
  });

  it("should return a array when the findPokemons service resposes ok", async () => {
    const mockGetPokemons = jest.spyOn(axios, "get").mockResolvedValue({
      data: pokemonsMocks,
    });

    const response = await PokemonService.findPokemons('ditto');

    expect(mockGetPokemons).toBeCalled();
    expect(response).toEqual(pokemonsMocks);
  });
});