import { LucideFilter } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldLabel } from "../ui/field";
import { Switch } from "../ui/switch";
import PKMSelect from "../PKMTypeSelect/PKMTypeSelect";
import PKMDateRange from "../PKMDateRange/PKMDateRange";
import PKMHeightSlider from "../PKMHeightSlider/PKMHeightSlider";
import { useState } from "react";
import { usePokedexStore } from "~/store";
import { useShallow } from "zustand/react/shallow";
import type { DateRange } from "react-day-picker";
import { Checkbox } from "../ui/checkbox";

const MIN_HEIGHT = 1.0;
const MAX_HEIGHT = 10000.0;

export default function PKMFilterDialog({
  setFilter,
}: {
  setFilter: (nf: Set<number>) => void;
}) {
  const pokemonList = usePokedexStore(useShallow((state) => state.pokemonList));
  const [rangeStart, setRangeStart] = useState(MIN_HEIGHT);
  const [rangeEnd, setRangeEnd] = useState(MAX_HEIGHT);

  const [selectedType, setSelectedType] = useState("");

  const [date, setDate] = useState<DateRange | undefined>();

  const [onlyCaught, setOnlyCaught] = useState(false);

  const heightFilter = (p: Pokemon) =>
    p.heightCm >= rangeStart && p.heightCm <= rangeEnd;

  const typeFilter = (p: Pokemon) =>
    p.type.some((t) => selectedType && t == selectedType);

  const dateFilter = (p: Pokemon) =>
    !date?.from ||
    !date?.to ||
    (p.caught &&
      p.caughtDate &&
      p.caughtDate > date.from &&
      p.caughtDate < date.to);

  const caughtFilter = (p: Pokemon) => !onlyCaught || p.caught;

  const applyFilters = () => {
    const newFilter = new Set(
      pokemonList
        .filter(heightFilter)
        .filter(typeFilter)
        .filter(dateFilter)
        .filter(caughtFilter)
        .map((p) => p.id),
    );

    console.log(onlyCaught);

    // todo this is a workaround. if no pkm matches then the set is empty.
    if ((!newFilter.size && date) || (!newFilter.size && onlyCaught))
      newFilter.add(-1);

    setFilter(newFilter);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="py-4.5">
          <LucideFilter />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LucideFilter size={18} />
            Filter
          </DialogTitle>
        </DialogHeader>
        <Field>
          <PKMHeightSlider
            rangeStart={rangeStart}
            setRangeStart={setRangeStart}
            rangeEnd={rangeEnd}
            setRangeEnd={setRangeEnd}
            min={MIN_HEIGHT}
            max={MAX_HEIGHT}
            className="flex flex-col gap-2"
          />
        </Field>
        <Field>
          <div className="flex">
            <FieldLabel className="basis-1/3">Type</FieldLabel>
            <PKMSelect
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
        </Field>
        <Field>
          <div className="flex">
            <FieldLabel className="basis-1/3">Caught Date</FieldLabel>
            <PKMDateRange date={date} setDate={setDate} className="basis-2/3" />
          </div>
        </Field>
        <Field>
          <div className="flex">
            <FieldLabel className="basis-1/3">Caught Only</FieldLabel>
            <Checkbox
              checked={onlyCaught}
              onCheckedChange={(s) => setOnlyCaught(!!s)}
            ></Checkbox>
          </div>
        </Field>
        <DialogFooter>
          <DialogClose>
            <Button onClick={applyFilters} className="w-full">
              Apply
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
