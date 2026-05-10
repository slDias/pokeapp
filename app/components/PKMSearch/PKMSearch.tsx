import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import usePKMSearch from "./usePKMSearch.hook";

type PKMSearchProps = {
  filteredPokemonList: Pokemon[];
  setFilteredPokemon: (p: Pokemon[]) => void;
  className?: string;
};

const PKMSearch = ({
  className = "",
  filteredPokemonList,
  setFilteredPokemon,
}: PKMSearchProps) => {
  const { searchText, handleTextChange } = usePKMSearch(
    filteredPokemonList,
    setFilteredPokemon,
  );
  return (
    <Field className={className}>
      <FieldLabel>Search</FieldLabel>
      <Input
        value={searchText}
        placeholder="Charmander"
        onChange={handleTextChange}
      />
      <FieldDescription>Search a pokémon by name or id</FieldDescription>
    </Field>
  );
};

export { PKMSearch };
