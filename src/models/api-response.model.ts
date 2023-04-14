export interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  handleScroll: React.UIEvent<HTMLDivElement> | any;
  pokemonFiltered: React.ChangeEvent<HTMLInputElement> | any;
}
