import { create } from "zustand";
import { devtools, persist, type StorageValue } from "zustand/middleware";
import { usePokemonTypeSlice, type PokemonTypeSlice } from "./pokemonType";
import { usePokemonListSlice, type PokemonListSlice } from "./pokemonList";

export interface PokedexState extends PokemonTypeSlice, PokemonListSlice {}

export const usePokedexStore = create<PokedexState>()(
  devtools(
    persist(
      (set, get, store) => ({
        ...usePokemonTypeSlice(set, get, store),
        ...usePokemonListSlice(set, get, store),
        sync: () => {
          get().syncPkmType();
          get().syncPkmList();
        },
      }),
      {
        name: "pokemon-name",
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const existingValue = JSON.parse(str);
            return {
              ...existingValue,
              state: {
                ...existingValue.state,
                pokemonList: new Map(existingValue.state.pokemonList),
              },
            };
          },
          setItem: (name, newValue: StorageValue<PokedexState>) => {
            // functions cannot be JSON encoded
            const str = JSON.stringify({
              ...newValue,
              state: {
                ...newValue.state,
                pokemonList: Array.from(newValue.state.pokemonList.entries()),
              },
            });
            localStorage.setItem(name, str);
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      },
    ),
  ),
);
