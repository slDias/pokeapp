import { usePokedexStore } from "~/store";

export default function usePKMTypeSelect(
  selectedType: string,
  setSelectedType: (s: string) => void,
) {
  const ignoreTypes = new Set(["stellar", "unknown", "shadow"]);
  const fullPokemonTypeList = usePokedexStore((state) => state.pokemonTypeList);
  const pokemonTypeList = fullPokemonTypeList.filter(
    (t) => !ignoreTypes.has(t),
  );

  return {
    selectedType,
    setSelectedType,
    pokemonTypeList,
  };
}
