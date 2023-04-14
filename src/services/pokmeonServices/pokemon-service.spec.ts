import axios from "axios";
import { PokemonServices } from "./pokemon-services";
import MockAdapter from "axios-mock-adapter";
import { Pokemon } from "../../utils/interfaces/pokemon-interfaces";

const axiosMock = new MockAdapter(axios);

describe("Gif Service", () => {
  it("should get gif array", async () => {
    axiosMock.onGet("/pokemon?limit=50&offset=1").reply(200, [
      {
        name: "bulbasaur",
        url: "example.com",
      },
    ] as Pokemon[]);
    const users = await PokemonServices.getPokemnos();
    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(Object);
  });
});
