import { vi } from "vitest";
import { Pokedex } from "pokeapi-js-wrapper";

vi.mock("pokeapi-js-wrapper", () => {
  const Pokedex = vi.fn(
    class {
      // getPokemonsList = mockPokemonsList;
    },
  );
  return { Pokedex };
});

export default vi.mocked(Pokedex);
