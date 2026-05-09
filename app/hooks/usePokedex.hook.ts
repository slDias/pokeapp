import { usePokedexStore } from "~/store";
import { toast } from "sonner";

import { useState } from "react";

export default function usePokedex() {
  const setError = (msg: string) =>
    toast.error(msg, { position: "top-center" });

  const pokemonList = usePokedexStore((state) => state.pokemonList);
  const [filteredPokemonList, setFilteredPokemon] = useState<Pokemon[]>(
    pokemonList.values().toArray(),
  );

  console.log("re-rendered");

  return {
    syncProgress: usePokedexStore((state) => state.syncProgress),
    filteredPokemonList,
    setFilteredPokemon,
  };
}
