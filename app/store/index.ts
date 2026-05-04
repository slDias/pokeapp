import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface PokedexState {
  pokemonNameList: string[];
  pokemonList: Pokemon[];
  syncProgress: number;
}

interface PokedexAction {
  setPokemonNameList: (newList: string[]) => void;
  addToPokemonList: (pokemon: Pokemon[]) => void;
  setSyncProgress: (progress: number) => void;
  reset: () => void;
}

export const usePokedexStore = create<PokedexState & PokedexAction>()(
  devtools(
    persist(
      (set, _, store) => ({
        pokemonNameList: [],
        pokemonList: [],
        syncProgress: 0,
        setPokemonNameList: (pokemonNameList) =>
          set((state) => ({ ...state, pokemonNameList })),
        addToPokemonList(pokemon) {
          set((state) => ({
            ...state,
            pokemonList: [...state.pokemonList, ...pokemon],
          }));
        },
        setSyncProgress(progress) {
          set((state) => ({ ...state, syncProgress: progress }));
        },
        reset: () => {
          set(store.getInitialState());
        },
      }),
      {
        name: "pokemon-name",
      },
    ),
  ),
);
