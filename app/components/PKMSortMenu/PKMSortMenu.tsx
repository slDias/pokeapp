import { LucideListFilter } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePKMSortMenu, type setSortFuncType } from "./usePKMSortMenu.hook";

type Props = {
  setSortFunc: setSortFuncType;
};

export default function PKMSortMenu({ setSortFunc }: Props) {
  const {
    sortField,
    setSortField,
    order,
    setOrder,
    sortableFields,
    ASC,
    DESC,
  } = usePKMSortMenu(setSortFunc);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="py-4.5 w-full">
          <LucideListFilter />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort field</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={sortField}
            onValueChange={(v) => setSortField(v as keyof Pokemon)}
          >
            {sortableFields
              .entries()
              .toArray()
              .map(([key, label]) => (
                <DropdownMenuRadioItem key={key} value={key}>
                  {label}
                </DropdownMenuRadioItem>
              ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Order</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
            <DropdownMenuRadioItem value={ASC}>Ascending</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value={DESC}>
              Descending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
