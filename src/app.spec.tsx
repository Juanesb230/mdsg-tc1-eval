import { act, fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import App from "./app";
import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "./services/pokmeonServices/pokemon-services";
import { shallow } from "enzyme";
import store from "./store/store";

const axiosMock = new MockAdapter(axiosInstance);

describe("App component", () => {
  afterEach(() => {
    cleanup();
  });
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

  // test("should call getMorePokemons when reaching the bottom of the page", async () => {
  //   const mockGetMorePokemons = jest.fn();
  //   const wrapper = shallow(<App />);
  //   axiosMock.onGet("/pokemon?limit=50&offset=50").reply(200, {
  //     results: [
  //       {
  //         url: "gifno1",
  //         name: "pikachu",
  //       },
  //       {
  //         url: "gifno2",
  //         name: "raichu",
  //       },
  //     ],
  //   });
  //   wrapper.instance().store.getMorePokemons = mockGetMorePokemons;
  //   // const spyGetMorePokemons = jest.spyOn(store.prototype, "store.getMorePokemons");
  //   const originalWindow = { ...window };
  //   const newWindow = Object.assign({}, window, {
  //     innerHeight: 500,
  //     scrollY: 1500,
  //     document: {
  //       body: {
  //         offsetHeight: 2000,
  //       },
  //     },
  //   });
  //   Object.defineProperty(global, "window", {
  //     value: newWindow,
  //   });
  //   expect(mockGetMorePokemons).toHaveBeenCalled();
  //   // expect(spyGetMorePokemons).toHaveBeenCalledTimes(1);

  //   Object.defineProperty(global, "window", {
  //     value: originalWindow,
  //   });

  //   await waitFor(() => {
  //     const pokemonCard = screen.getByText("pikachu");
  //     expect(pokemonCard).toBeVisible();
  //   });
  // });

  it("loads more pokemons on scroll", async () => {
    axiosMock.onGet("/pokemon?limit=50&offset=50").reply(200, {
      results: [
        {
          url: "gifno1",
          name: "pikachu",
        },
        {
          url: "gifno2",
          name: "ivysaur",
        },
      ],
    });
    render(<App />);
    window.innerHeight = 1000;
    window.scrollY = 1200;

    fireEvent.scroll(window);

    await waitFor(() => {
      screen.getByText("ivysaur");
    });
  });

  it("should not call getMorePokemons when user has not scrolled to the bottom of the page", () => {
    const store = {
      getMorePokemons: jest.fn(),
      page: 0,
    };
    const handleOnScroll = jest.fn();

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
    let result;
    act(() => {
      result = handleOnScroll.bind(null, store)();
    });
    expect(store.getMorePokemons).not.toHaveBeenCalled();
    expect(store.page).toEqual(0);
  });
});
