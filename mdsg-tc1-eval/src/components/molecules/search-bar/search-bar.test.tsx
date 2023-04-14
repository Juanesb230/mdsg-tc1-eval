import { render, screen , fireEvent} from '@testing-library/react'
import axiosMock from "../../../utils/mocks/axios-mock";
import ContextMock from "../../../utils/mocks/context-mock";
import { pokemonsMocks } from "../../../utils/mocks/pokemons-mock";
import SearchBar from './search-bar'
describe('SearchBar component', () => {
    const setSearchedPokemon = jest.fn()
    const text = 'Pokemons'
    it('should render SearchBar by label found', () => {
        axiosMock.get.mockResolvedValueOnce(pokemonsMocks)
        render(
            <ContextMock values={{pokemons:[]}}>
                <SearchBar text = {text} setSearchedPokemon={setSearchedPokemon} />
            </ContextMock>
        );
        const labelFound = screen.getByText('Pokemons')
        expect(labelFound).toBeInTheDocument()
    })
    it('should call setSearchedPokemon function', () => {
        axiosMock.get.mockResolvedValueOnce(pokemonsMocks)
        render(
            <ContextMock values={{pokemons:[]}}>
                <SearchBar text = {text} setSearchedPokemon={setSearchedPokemon} />
            </ContextMock>
        );
        const inputFound = screen.getByRole('textbox')
        fireEvent.change(inputFound, {target: {value: 'ditto'}})
        expect(setSearchedPokemon).toHaveBeenCalled()
    })
})