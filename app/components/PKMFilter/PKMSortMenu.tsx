import { LucideListFilter } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

export default function PKMSortMenu() {
  const [sortField, setSortField] = useState("id");
  const [order, setOrder] = useState("ascending");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
            onValueChange={setSortField}
          >
            <DropdownMenuRadioItem value="id">Id</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="height">Height</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="type">Type</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="caught">Caught</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="caughtDate">
              Caught Date
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Order</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
            <DropdownMenuRadioItem value="ascending">
              Ascending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="descending">
              Descending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
