import axios from 'axios'
import { Pokemon } from '../../utils/interfaces/pokemon'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

export class PokemonService {
  static async getPokemons(limit: string, offset: string) {
    const { data }  = await axios.get(API_URL+'?limit='+limit+'&offset='+offset)
    return data.results
  }

  static async findPokemons(name: string) {
    const { data }  = await axios.get(API_URL+'?limit=50&offset=0')
    const responseFilter = data.results.filter((pokemon: Pokemon) => pokemon.name!.includes(name))
    return responseFilter
  }
}