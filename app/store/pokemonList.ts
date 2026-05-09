import { Pokedex } from "pokeapi-js-wrapper";
import { type StateCreator } from "zustand";
import { parsePokemon } from "~/lib/utils";
import type { PokedexState } from ".";

export interface PokemonListSlice {
  pokemonList: Map<number, Pokemon>;
  syncProgress: number | null;
  syncPkmList: () => void;
  catchPokemon: (id: number) => void;
  releasePokemon: (id: number) => void;
  addNote: (pkmId: number, note: Note) => void;
  editNote: (pkmId: number, idx: number, note: Note) => void;
  syncPokemon: (pkmId: number) => void;
}

const api = new Pokedex();

export const usePokemonListSlice: StateCreator<
  PokedexState & PokemonListSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  PokemonListSlice
> = (set, get) => ({
  pokemonList: new Map([] as [number, Pokemon][]),
  syncProgress: null,
  syncPkmList: async () => {
    if (get().syncProgress != null) return;
    set({ syncProgress: 0 });

    let rawPkmNameList;

    try {
      rawPkmNameList = await api.getPokemonsList();
    } catch {
      // setError("Network error while syncing. Try again.");
      return;
    }

    // usePokedexStore.getState().reset();

    let pokemonNameList = rawPkmNameList.results.map((pkm) => pkm.name);

    const pkmCount = pokemonNameList.length;
    let currCount = 0;

    while (currCount != pkmCount) {
      const req = pokemonNameList
        .slice(currCount, currCount + 10)
        .map((pkmName) => api.getPokemonByName(pkmName));

      let res;

      try {
        res = await Promise.all(req);
      } catch {
        //setError("Network error while syncing. Try again.");
        return;
      }

      const newPkmns = new Map(get().pokemonList);
      res.forEach((r) => newPkmns.set(r.id, parsePokemon(r)));
      currCount = newPkmns.size;
      set({
        pokemonList: newPkmns,
        syncProgress: Math.ceil((currCount / pkmCount) * 100),
      });
    }
  },
  catchPokemon: (id: number) => {
    const pokemonList = new Map(get().pokemonList);
    const pokemon = pokemonList.get(id);
    if (!pokemon) return;
    pokemon.caught = true;
    pokemon.caughtDate = new Date();
    pokemonList.set(id, pokemon);
    set({ pokemonList });
  },
  releasePokemon: (id: number) => {
    const pokemonList = new Map(get().pokemonList);
    const pokemon = pokemonList.get(id);
    if (!pokemon) return;
    pokemon.caught = false;
    delete pokemon.caughtDate;
    pokemonList.set(id, pokemon);
    set({ pokemonList });
  },
  addNote: (pkmId: number, note: Note) => {},
  editNote: (pkmId: number, idx: number, note: Note) => {},
  syncPokemon: async (id: number) => {
    let pokemon = get().pokemonList.get(id);
    if (pokemon) return;

    let res;

    try {
      res = await api.getPokemonByName(id);
    } catch {
      // todo
      return;
    }

    const pokemonList = new Map(get().pokemonList);
    pokemon = parsePokemon(res);
    pokemonList.set(id, pokemon);
    set({ pokemonList });
  },
});
