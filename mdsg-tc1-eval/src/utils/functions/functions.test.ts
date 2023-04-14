import {getId, getUrl} from './functions'

describe('Functions file tests', () => {
    it('should return an id string', () => {
        expect(getId('https://pokeapi.co/api/v2/pokemon/123/')).toBe('123')
    })
    it('should return a url string', () => {
        expect(getUrl('123')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/123.svg')
    })
})