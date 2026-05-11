import { usePokedexStore } from "~/store";
import { toast } from "sonner";
import { useState } from "react";

export default function usePokedex() {
  const setError = (msg: string) =>
    toast.error(msg, { position: "top-center" });

  const fullPkmMap = usePokedexStore((state) => state.pokemonList);

  const [filterIds, setFilterIds] = useState<Set<number>>(
    new Set(fullPkmMap.keys()),
  );

  const [searchIds, setSearchIds] = useState<Set<number>>(
    new Set(fullPkmMap.keys()),
  );

  const defaultSortFunc = (a: Pokemon, b: Pokemon) => 0;
  const [sortFunc, setSortFunc] = useState<(a: Pokemon, b: Pokemon) => number>(
    () => defaultSortFunc,
  );

  const resultingPokemonList = filterIds
    .intersection(searchIds)
    .keys()
    .map((pid) => fullPkmMap.get(pid)!)
    .toArray()
    .sort(sortFunc);

  return {
    syncProgress: usePokedexStore((state) => state.syncProgress),
    setFilterIds,
    setSearchIds,
    setSortFunc,
    resultingPokemonList,
  };
}
