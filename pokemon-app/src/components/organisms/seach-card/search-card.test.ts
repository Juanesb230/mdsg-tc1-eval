import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchCard from "./search-card";

describe("SearchCard", () => {
  it("should render SearchCard component", () => {
    render(<SearchCard />);
  });

  it("should render SearchCard component with props", () => {
    render(
      <SearchCard
        name="test"
        url="https://pokeapi.co/api/v2/pokemon/1/"
        onClick={() => {}}
      />
    );
  });

  it("should render SearchCard component with props and click", () => {
    const onClick = jest.fn();
    render(
      <SearchCard
        name="test"
        url="https://pokeapi.co/api/v2/pokemon/1/"
        onClick={onClick}
      />
    );
    userEvent.click(screen.getByTestId("search-card"));
    expect(onClick).toHaveBeenCalled();
  });
}); 

