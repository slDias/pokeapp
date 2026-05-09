import { Pokedex } from "pokeapi-js-wrapper";
import { type StateCreator } from "zustand";
import type { PokedexState } from ".";

const api = new Pokedex();

export interface PokemonTypeSlice {
  pokemonTypeList: string[];
  syncPkmType: () => void;
}

export const usePokemonTypeSlice: StateCreator<
  PokedexState & PokemonTypeSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  PokemonTypeSlice
> = (set) => ({
  pokemonTypeList: [],
  syncPkmType: async () => {
    const res = await api.getTypesList();
    set({ pokemonTypeList: res.results.map((t) => t.name) });
  },
});
