import { useState } from "react";
import { usePokedexStore } from "~/store";
import { useShallow } from "zustand/react/shallow";
import type { DateRange } from "react-day-picker";
import usePKMHeightSliderHook from "~/components/PKMHeightSlider/usePKMHeightSlider.hook";
import usePKMTypeSelect from "../PKMTypeSelect/usePKMTypeSelect";

export default function usePKMFilterDialog(
  setFilter: (ids: Set<number>) => void,
) {
  const pokemonList = usePokedexStore(useShallow((state) => state.pokemonList));
  const sliderHook = usePKMHeightSliderHook();
  const typeSelectHook = usePKMTypeSelect();

  const [date, setDate] = useState<DateRange | undefined>();

  const [onlyCaught, setOnlyCaught] = useState(false);

  const heightFilter = (p: Pokemon) =>
    p.heightCm >= sliderHook.rangeStart && p.heightCm <= sliderHook.rangeEnd;

  const typeFilter = (p: Pokemon) =>
    p.type.some(
      (t) => typeSelectHook.selectedType && t == typeSelectHook.selectedType,
    );

  const dateFilter = (p: Pokemon) =>
    !date?.from ||
    !date?.to ||
    (p.caught &&
      p.caughtDate &&
      p.caughtDate > date.from &&
      p.caughtDate < date.to);

  const caughtFilter = (p: Pokemon) => !onlyCaught || p.caught;

  const applyFilters = () => {
    console.log(pokemonList[0]);
    console.log(sliderHook.rangeStart, sliderHook.rangeEnd);
    const newFilter = new Set(
      pokemonList
        .filter(heightFilter)
        .filter(typeFilter)
        /*.filter(dateFilter)
        .filter(caughtFilter)*/
        .map((p) => p.id),
    );

    // todo this is a workaround. if no pkm matches then the set is empty.
    if ((!newFilter.size && date) || (!newFilter.size && onlyCaught))
      newFilter.add(-1);

    console.log("Attempt to set filter", setFilter);

    setFilter(newFilter);
  };

  return {
    sliderHook,
    typeSelectHook,
    date,
    setDate,
    onlyCaught,
    setOnlyCaught,
    applyFilters,
  };
}
