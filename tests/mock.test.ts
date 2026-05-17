import { vi } from "vitest";
import { rawPokemon, rawPokemonList } from "./commons.test";

const mockAPI = {
  getPokemonsList: vi.fn().mockImplementation(() => rawPokemonList),
  getTypesList: vi
    .fn()
    .mockImplementation(() => ({ results: rawPokemon.types })),
  getPokemonByName: vi.fn().mockImplementation(() => rawPokemon),
};

export type MockAPI = typeof mockAPI;

function mockPokeAPIFactory() {
  const Pokedex = vi.fn(
    class {
      constructor() {
        return mockAPI;
      }
    },
  );
  return { default: { Pokedex }, Pokedex };
}

vi.mock("pokeapi-js-wrapper", mockPokeAPIFactory);
