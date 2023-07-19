import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';


import App from './App';
import PokemonTool from './components/pokemonTool/pokemonTool';
import PokemonInfo from './components/pokemonInfo/pokemonInfo';
import { Pokedex as _Pokedex } from 'pokeapi-js-wrapper';

jest.mock('pokeapi-js-wrapper', () => {
  return({
    Pokedex: function() {
      return {
        getPokedexs: function() {
          return Promise.resolve({results: [{name: "Region"}, {name: "Minecraft "}]})
        },
        getPokedexByName: function(name) {
          return Promise.resolve({pokemon_entries: [{pokemon_species: {name: "Steve"}}, {pokemon_species: {name: "Charizard"}}, {pokemon_species: {name: "Mr. Mime"}}]});
        },
        getPokemonByName: function(name) {
          return Promise.resolve({
            sprites: {
              front_default: "null",
              front_shiny: "null",
              other: {
                dream_world: "null",
                home: "null",
                "official-artwork": "null"
              },
              versions: {
                version: {
                  game: {
                    front_default: "null"
                  }
                }
              }
            },
            name: "Pikachu",
            types: [{type: {name: "electric"}}],
            weight: 50,
            height: 50,
            stats: [{base_stat: 50}, {base_stat: 50}, {base_stat: 50}, {base_stat: 50}, {base_stat: 50}, {base_stat: 50}]
          })
        }

      }
    }
  })
});


describe("Regions displaying correctly", () => {
  beforeEach(() => {
    render(<App />)
  })
  test("Displays 'Region'", async () => {
    await waitFor(() => {
      expect(screen.getByText("Region")).toBeInTheDocument();
    })
  })
  test("Displays 'Minecraft'", async () => {
    await waitFor(() => {
      expect(screen.getByText("Minecraft")).toBeInTheDocument();
    })
  })
});
describe("Pokemon displaying correctly", () => {
  beforeEach(() => {
    const dex = new _Pokedex();
    render(<PokemonTool pokedex={"null"} module={dex} back_button={() => {}} showMoreInfo={() => {}}/>)
  });
  test("Displays 'Steve'", async () => {
    await waitFor(() => {
      expect(screen.getByText("Steve")).toBeInTheDocument();
    })
  })
  test("Displays 'Charizard'", async () => {
    await waitFor(() => {
      expect(screen.getByText("Charizard")).toBeInTheDocument();
    })
  })
  test("Displays 'Mr. Mime'", async () => {
    await waitFor(() => {
      expect(screen.getByText("Mr. Mime")).toBeInTheDocument();
    })
  })
});
describe("Pokemon details display correctly", () => {
  beforeEach(() => {
    const dex = new _Pokedex();
    render(<PokemonInfo pokemon={"null"} module={dex} back={() => {}}/>)
  });
  test("Displays 'Pikachu'", async () => {
    await waitFor(() => {
      expect(screen.getByText("Pikachu")).toBeInTheDocument();
    })
  })
  test("Displays '50 kg'", async () => {
    await waitFor(() => {
      expect(screen.getByText("50 kg")).toBeInTheDocument();
    })
  })
  test("Displays '5 m'", async () => {
    await waitFor(() => {
      expect(screen.getByText("5 m")).toBeInTheDocument();
    })
  })
  test("Displays '50 HP'", async () => {
    await waitFor(() => {
      expect(screen.getByText("50 HP")).toBeInTheDocument();
    })
  })
  test("Displays '50 Spd'", async () => {
    await waitFor(() => {
      expect(screen.getByText("50 Spd")).toBeInTheDocument();
    })
  })
  test("Displays '50 Atk'", async () => {
    await waitFor(() => {
      expect(screen.getByText("50 Atk")).toBeInTheDocument();
    })
  })
  test("Displays '50 Def'", async () => {
    await waitFor(() => {
      expect(screen.getByText("50 Def")).toBeInTheDocument();
    })
  })
  test("Displays '50 S. Atk'", async () => {
    await waitFor(() => {
      expect(screen.getByText("50 S. Atk")).toBeInTheDocument();
    })
  })
  test("Displays '50 S. Def'", async () => {
    await waitFor(() => {
      expect(screen.getByText("50 S. Def")).toBeInTheDocument();
    })
  })
});
describe("Test user inputs", () => {
  beforeEach(() => {
    render(<App />);
  })
  test("Clicking on a region renders a list of pokemon", async () => {
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId("pokedex-region0"));
      await waitFor(() => {
        expect(screen.getByText("Steve")).toBeInTheDocument();
      })
    })
  });
  test("Clicking on a Pokemon renders info", async () => {
    await waitFor(async () => {
      fireEvent.click(screen.getByTestId("pokedex-region0"));
      await waitFor(async () => {
        fireEvent.click(screen.getByTestId("pokedex-pokemon0"));
        await waitFor(() => {
          expect(screen.getByText("Pikachu")).toBeInTheDocument();
        });
      })
    })
  });
});