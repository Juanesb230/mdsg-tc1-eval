import { act, fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import App from "./app";
import MockAdapter from "axios-mock-adapter";
import { Pokemon } from "./utils/interfaces/pokemon-interfaces";
import { axiosInstance } from "./services/pokmeonServices/pokemon-services";
import store from "./store/store";

const axiosMock = new MockAdapter(axiosInstance);

describe("App component", () => {
  it("Should render the title", async () => {
    axiosMock.onGet("/pokemon?limit=50&offset=0").reply(200, {
      results: [
        {
          url: "gifno1",
          name: "bulbasaur",
        },
        {
          url: "gifno2",
          name: "ivysaur",
        },
      ],
    });
    render(<App />);
    const title = screen.getByText(/total of pokemon:/);
    expect(title).toBeVisible();
    await waitFor(() => {
      const pokemonCard = screen.getByText("bulbasaur");
      expect(pokemonCard).toBeVisible();
    });
  });

  it("should filter pokemons by name", async () => {
    render(<App />);
    axiosMock.onGet("/pokemon?limit=50&offset=0").reply(200, {
      results: [
        {
          url: "gifno1",
          name: "bulbasaur",
        },
        {
          url: "gifno2",
          name: "ivysaur",
        },
      ],
    });

    await waitFor(() => {
      const pokemonCard = screen.getByText("bulbasaur");
      expect(pokemonCard).toBeVisible();
    });
    const input = screen.getByPlaceholderText("buscar pokemon");
    fireEvent.change(input, { target: { value: "bulbasaur" } });
    await waitFor(() => {
      const pokemonCard = screen.getByText("bulbasaur");
      expect(pokemonCard).toBeVisible();
    });

    await waitFor(() => {
      const pokemonCard2 = screen.queryByText("ivysaur");
      expect(pokemonCard2).not.toBeInTheDocument();
    });
  });

  it("should add and remove event listener on window object", () => {
    const addEventSpy = jest.spyOn(window, "addEventListener");
    const removeEventSpy = jest.spyOn(window, "removeEventListener");

    render(<App />);

    expect(addEventSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

    cleanup();

    expect(removeEventSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  test("should call getMorePokemons when reaching the bottom of the page", async () => {
    // const getMorePokemons = jest.fn();
    render(<App />);
    axiosMock.onGet("/pokemon?limit=50&offset=50").reply(200, {
      results: [
        {
          url: "gifno1",
          name: "pikachu",
        },
        {
          url: "gifno2",
          name: "raichu",
        },
      ],
    });
    jest.spyOn(global, "window", "get").mockImplementation(() =>
      Object.assign({}, window, {
        innerHeight: 500,
        scrollY: 800,
        document: {
          body: {
            offsetHeight: 1300,
          },
        },
      })
    );

    const caller = store.getMorePokemons(50);
    expect(caller).not.toHaveBeenCalled();

    await waitFor(() => {
      const pokemonCard = screen.getByText("pikachu");
      expect(pokemonCard).toBeVisible();
    });
  });

  // test("should remove scroll listener on unmount", () => {
  //   const removeEventListener = jest.fn();
  //   jest.spyOn(global, "window", "get").mockImplementation(() => ({
  //     addEventListener: jest.fn(),
  //     removeEventListener,
  //   }));

  //   const { unmount } = renderHook(() => usePokemonScroll(jest.fn()));

  //   expect(removeEventListener).not.toHaveBeenCalled();

  //   unmount();

  //   expect(removeEventListener).toHaveBeenCalled();
  // });

  // it("should call getMorePokemons when user has scrolled to the bottom of the page", () => {
  //   const handleOnScroll = jest.fn();
  //   const store = {
  //     getMorePokemons: jest.fn(),
  //     page: 0,
  //   };
  //   const windowMock = {
  //     innerHeight: 100,
  //     scrollY: 500,
  //     document: {
  //       body: {
  //         offsetHeight: 1000,
  //       },
  //     },
  //   };
  //   let result;
  //   act(() => {
  //     result = handleOnScroll.bind(null, store)();
  //   });
  //   expect(store.getMorePokemons).toHaveBeenCalled();
  //   expect(store.page).toEqual(50);
  // });

  // it("should not call getMorePokemons when user has not scrolled to the bottom of the page", () => {
  //   const store = {
  //     getMorePokemons: jest.fn(),
  //     page: 0,
  //   };
  //   const handleOnScroll = jest.fn();
  //   const windowMock = {
  //     innerHeight: 100,
  //     scrollY: 0,
  //     document: {
  //       body: {
  //         offsetHeight: 1000,
  //       },
  //     },
  //   };
  //   let result;
  //   act(() => {
  //     result = handleOnScroll.bind(null, store)();
  //   });
  //   expect(store.getMorePokemons).not.toHaveBeenCalled();
  //   expect(store.page).toEqual(0);
  // });
});
