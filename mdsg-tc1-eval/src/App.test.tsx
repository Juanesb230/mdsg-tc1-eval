import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it("Should render the label of search Bar", () => {
  render(<App />);
  const label = screen.getByText("Pokemons Totales");
  expect(label).toBeInTheDocument();
});

