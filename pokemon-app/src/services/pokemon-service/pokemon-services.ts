import axios from "axios";
import Pokemon from "../../utils/interfaces/pokemon";

export default class PokemonService {
  private static URL = process.env.POKEMON_API_URL || "";
  private static POKEMON_IMG = process.env.POKE_API_IMG_URL || 1;
    //get all pokemons img
    static async getPokemonsImg() {
        const response = await axios.get<Pokemon[]>(
            `${this.POKEMON_IMG}/?author_id=${this.URL}.svg`
        );
        return response.data;
    }

  static async getPokemonsByLimitAndOffset(limit: number, offset: number) {
    const response = await axios.get<Pokemon[]>(
      `${this.URL}/?limit=${limit}&offset=${offset}`
    );
    return response.data;
  }
}
