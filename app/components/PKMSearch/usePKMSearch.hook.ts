import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import { usePokedexStore } from "~/store";

export default function usePKMSearch(setSearchIds: (pl: Set<number>) => void) {
  const [searchText, _setSearchText] = useState("");
  const fullPkmList = usePokedexStore((state) => state.pokemonList);
  const strippedPkmList = fullPkmList
    .values()
    .map((p) => ({ id: p.id, name: p.name }));

  const fuse = useMemo(() => {
    return new Fuse(strippedPkmList.toArray(), {
      keys: ["name", "id"],
      threshold: 0.3,
    });
  }, [fullPkmList]);

  const setSearchText = useMemo(
    () =>
      debounce((newText: string) => {
        setSearchIds(new Set(fuse.search(newText).map((v) => v.item.id)));
      }, 350),
    [],
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setSearchText(e.target.value);
    setSearchText(e.target.value);
  };

  return { searchText, handleTextChange };
}
