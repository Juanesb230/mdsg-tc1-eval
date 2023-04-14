export interface Pokemon {
  name: string;
  url: string;
}
export interface PokemonWithImage extends Pokemon {
  img: string;
}
