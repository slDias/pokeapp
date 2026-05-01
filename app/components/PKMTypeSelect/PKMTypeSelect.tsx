import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function PKMSelect() {
  const [selectedType, setSelectedType] = useState("");
  const typeList = [
    {
      name: "normal",
      url: "https://pokeapi.co/api/v2/type/1/",
    },
    {
      name: "fighting",
      url: "https://pokeapi.co/api/v2/type/2/",
    },
    {
      name: "flying",
      url: "https://pokeapi.co/api/v2/type/3/",
    },
    {
      name: "poison",
      url: "https://pokeapi.co/api/v2/type/4/",
    },
  ];
  return (
    <div className="basis-2/3 flex">
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {typeList.map((t, i) => (
            <SelectItem key={i} value={t.name}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedType && (
        <Button variant={"ghost"} onClick={(_) => setSelectedType("")}>
          <X />
        </Button>
      )}
    </div>
  );
}
