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

export default function PKMSelect({
  selectedType,
  setSelectedType,
}: {
  selectedType: string;
  setSelectedType: (t: string) => void;
}) {
  const typeList = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "stellar",
    "unknown",
    "shadow",
  ];
  return (
    <div className="basis-2/3 flex">
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {typeList.map((t, i) => (
            <SelectItem key={i} value={t}>
              {t}
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
