import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import usePKMSearch from "./usePKMSearch.hook";

type PKMSearchProps = {
  className?: string;
  setFilterIdList: (s: Set<number>) => void;
};

const PKMSearch = ({ className = "", setFilterIdList }: PKMSearchProps) => {
  const { searchText, handleTextChange } = usePKMSearch(setFilterIdList);
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

export default PKMSearch;
