import { render, screen } from "@testing-library/react";
import { SearchBar } from "./searchBar";

describe("SearchBar", () => {
  it("should render the input", () => {
    const handleChange = jest.fn();
    render(<SearchBar handleChange={handleChange} counter={45} />);
    const gifInput = screen.getByPlaceholderText("buscar pokemon");
    expect(gifInput).toBeDefined();
    expect(gifInput).toHaveTextContent("");
  });
  it("should render the input with error message", () => {
    const handleChange = jest.fn();
    render(<SearchBar handleChange={handleChange} counter={45} />);
    const gifInput = screen.getByPlaceholderText("buscar pokemon");
    expect(gifInput).toBeDefined();
    expect(gifInput).toHaveTextContent("");
  });
});
