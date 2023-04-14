
const POKEMON_IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'
const POKEMON_URL =  'https://pokeapi.co/api/v2/pokemon/'
const urlSize = POKEMON_URL.length

export const getId= (url: string) => {
    const id = url.substring(urlSize);
    const indexChar = id.indexOf('/')
    return id.substring(0, indexChar)
}
export const getUrl= (id: string) => {
    return POKEMON_IMAGE_URL+id+'.svg'
}