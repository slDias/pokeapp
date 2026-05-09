import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import { usePokedexStore } from "~/store";
import { useShallow } from "zustand/react/shallow";

export default function usePKMSearch(
  setFilterIdList: (pl: Set<number>) => void,
) {
  const pokemonList = usePokedexStore(useShallow((state) => state.pokemonList));
  const [searchText, _setSearchText] = useState("");

  const fuse = useMemo(() => {
    const pokemonIdList = pokemonList
      .values()
      .toArray()
      .map((p) => ({ id: p.id, name: p.name }));
    return new Fuse(pokemonIdList, {
      keys: ["name", "id"],
      threshold: 0.3,
    });
  }, [pokemonList]);

  const setSearchText = useMemo(
    () =>
      debounce((newText: string) => {
        setFilterIdList(
          fuse.search(newText).reduce((result, v) => {
            result.add(v.item.id);
            return result;
          }, new Set<number>()),
        );
      }, 300),
    [],
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setSearchText(e.target.value);
    setSearchText(e.target.value);
  };

  return { searchText, handleTextChange };
}
