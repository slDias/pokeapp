import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import type usePKMTypeSelect from "./usePKMTypeSelect";

type PKMTypeSelectProps = {
  hook: ReturnType<typeof usePKMTypeSelect>;
};

const PKMTypeSelect = ({ hook }: PKMTypeSelectProps) => (
  <div className="basis-2/3 flex">
    <Select value={hook.selectedType} onValueChange={hook.setSelectedType}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {hook.pokemonTypeList.map((t, i) => (
          <SelectItem key={i} value={t}>
            {t}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {hook.selectedType && (
      <Button variant={"ghost"} onClick={(_) => hook.setSelectedType("")}>
        <X />
      </Button>
    )}
  </div>
);

export default PKMTypeSelect;
