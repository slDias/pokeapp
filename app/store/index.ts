import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PokedexState {
  pokemonNameList: string[];
  pokemonList: Pokemon[];
}

interface PokedexAction {
  setPokemonNameList: (newList: string[]) => void;
  addToPokemonList: (pokemon: Pokemon) => void;
}

export const usePokedexStore = create<PokedexState & PokedexAction>()(
  persist(
    (set) => ({
      pokemonNameList: [],
      pokemonList: [],
      setPokemonNameList: (pokemonNameList) =>
        set((state) => ({ ...state, pokemonNameList })),
      addToPokemonList(pokemon) {
        set((state) => ({
          ...state,
          pokemonList: [...state.pokemonList, pokemon],
        }));
      },
    }),
    {
      name: "pokemon-name",
    },
  ),
);
