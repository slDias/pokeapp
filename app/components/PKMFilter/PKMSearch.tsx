import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function PKMSearch({ className = "" }: { className?: string }) {
  const [search, setSearch] = useState("");
  return (
    <Field className={className}>
      <FieldLabel>Search</FieldLabel>
      <Input
        placeholder="Charmander"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FieldDescription>Search a pokémon by name or id</FieldDescription>
    </Field>
  );
}
