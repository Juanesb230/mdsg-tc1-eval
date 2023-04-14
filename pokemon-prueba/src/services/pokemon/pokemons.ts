import axios from 'axios'
import { Pokemon } from '../../utils/interfaces/Pokemons';
//import { Pokemon } from '../../utils/interfaces/Pokemons'

const API_URL = "https://pokeapi.co/api/v2/pokemon"

export class PokemonService {
    static async getPokemons(limit: string, offset: string) {
        const { data } = await axios.get(API_URL+ '?limit='+ limit +'offset='+ offset, { params: { author_id: '1000'}})
        //console.log("datoskev", data.results);
        return data.results
    }

    static async findPokemons(name: string) {
        const { data } = await axios.get(API_URL, { params: { author_id: '1000'}})
        const pokemonFind = data.results.filter((pokemon: Pokemon) => pokemon.name!.includes(name))
        return pokemonFind
    }

    static async getPokemonsOffset(limit: number, offset: number) {
        const { data } = await axios.get(API_URL+ '?limit='+ limit +'offset='+ offset, { params: { author_id: '1000'}})
        //console.log("datoskev", data.results);
        return data.results
    }
}
