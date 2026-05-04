import { Pokedex } from "pokeapi-js-wrapper";
import { usePokedexStore } from "~/store";
import { toast } from "sonner";
import { parsePokemon } from "~/lib/utils";

import { useShallow } from "zustand/react/shallow";
import usePKMFilter from "~/components/PKMFilter/usePKMFilter.hook";
import { useState } from "react";

const api = new Pokedex();

export default function usePokedex() {
  const setError = (msg: string) =>
    toast.error(msg, { position: "top-center" });

  const [idFilter, setIdFilter] = useState<Set<number>>(new Set());

  const filterHook = usePKMFilter(setIdFilter);

  const sync = async () => {
    let {
      pokemonNameList,
      setPokemonNameList,
      pokemonList,
      addToPokemonList,
      setSyncProgress,
    } = usePokedexStore.getState();

    if (!pokemonNameList.length) {
      let rawPkmNameList;

      try {
        rawPkmNameList = await api.getPokemonsList();
      } catch {
        setError("Network error while syncing. Try again.");
        return;
      }

      usePokedexStore.getState().reset();
      pokemonList = usePokedexStore.getState().pokemonList;

      setPokemonNameList(rawPkmNameList.results.map((pkm) => pkm.name));
      pokemonNameList = usePokedexStore.getState().pokemonNameList;
    }

    const pkmCount = pokemonNameList.length;
    let currCount = pokemonList.length;
    const updtProgress = () => setSyncProgress((currCount / pkmCount) * 100);
    updtProgress();

    while (currCount != pkmCount) {
      const req = pokemonNameList
        .slice(currCount, currCount + 10)
        .map((pkmName) => api.getPokemonByName(pkmName));

      let res;

      try {
        res = await Promise.all(req);
      } catch {
        setError("Network error while syncing. Try again.");
        return;
      }

      const newPkmns = res.map((r) => parsePokemon(r));
      addToPokemonList(newPkmns);

      currCount = Math.min(currCount + 10, pkmCount);
      updtProgress();
    }
  };

  return {
    sync,
    syncProgress: usePokedexStore(useShallow((state) => state.syncProgress)),
    pokemonList: usePokedexStore(useShallow((state) => state.pokemonList)),
    setIdFilter,
    idFilter,
  };
}
