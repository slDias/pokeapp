import { useState } from "react";
import { usePokedexStore } from "~/store";

export default function usePKMTypeSelect() {
  const [selectedType, setSelectedType] = useState("");
  const pokemonTypeList = usePokedexStore((state) => state.pokemonTypeList);

  return {
    selectedType,
    setSelectedType,
    pokemonTypeList,
  };
}
