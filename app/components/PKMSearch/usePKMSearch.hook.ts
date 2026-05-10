import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import { usePokedexStore } from "~/store";

export default function usePKMSearch(
  filteredPokemonList: Pokemon[],
  setFilteredPokemon: (pl: Pokemon[]) => void,
) {
  const [searchText, _setSearchText] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(filteredPokemonList, {
      keys: ["name", "id"],
      threshold: 0.3,
    });
  }, []);

  const setSearchText = useMemo(
    () =>
      debounce((newText: string) => {
        setFilteredPokemon(fuse.search(newText).map((v) => v.item));
      }, 300),
    [],
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setSearchText(e.target.value);
    setSearchText(e.target.value);
  };

  return { searchText, handleTextChange };
}
