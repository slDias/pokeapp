import { LucideFilter, LucideListFilter } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";

export default function PKMFilter() {
  return (
    <div className="border-soli border-b px-2 py-4 flex gap-2">
      <Field className="gap-1 grow">
        <FieldLabel>Search</FieldLabel>
        <Input placeholder="Charmander" />
        <FieldDescription>Search a pokémon by name or id</FieldDescription>
      </Field>
      <div className="flex flex-col shrink gap-1">
        <Button variant="outline" className="py-4.5">
          <LucideListFilter />
          Sort
        </Button>
        <Button variant="outline" className="py-4.5">
          <LucideFilter />
          Filters
        </Button>
      </div>
    </div>
  );
}
