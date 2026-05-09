import { useState } from "react";
import { usePokedexStore } from "~/store";
import usePKMHeightSliderHook from "~/components/PKMHeightSlider/usePKMHeightSlider.hook";
import usePKMTypeSelect from "~/components/PKMTypeSelect/usePKMTypeSelect";
import useDateRangePickerHook from "~/components/PKMDateRange/useDateRangePicker.hook";
import type { DateRange } from "react-day-picker";

export default function usePKMFilterDialog(
  setFilteredPokemon: (pkms: Pokemon[]) => void,
) {
  const pokemonList = usePokedexStore((state) => state.pokemonList);

  const [heightRange, setHeightRange] = useState<number[]>([1.0, 10000.0]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [onlyCaught, setOnlyCaught] = useState(false);

  const sliderHook = usePKMHeightSliderHook(heightRange, setHeightRange);
  const typeSelectHook = usePKMTypeSelect(selectedType, setSelectedType);
  const dateRangePickerHook = useDateRangePickerHook(dateRange, setDateRange);

  const heightFilter = (p: Pokemon) =>
    p.heightCm >= heightRange[0] && p.heightCm <= heightRange[1];

  const typeFilter = (p: Pokemon) =>
    !selectedType || p.type.some((t) => t == selectedType);

  const dateFilter = (p: Pokemon) =>
    !dateRange.from ||
    !dateRange.to ||
    (p.caughtDate &&
      p.caughtDate >= dateRange.from &&
      p.caughtDate <= dateRange.to);

  const caughtFilter = (p: Pokemon) => !onlyCaught || p.caught;

  const applyFilters = () => {
    setFilteredPokemon(
      pokemonList
        .values()
        .filter(heightFilter)
        .filter(typeFilter)
        .filter(dateFilter)
        .filter(caughtFilter)
        .toArray(),
    );
  };

  return {
    sliderHook,
    typeSelectHook,
    dateRangePickerHook,
    onlyCaught,
    setOnlyCaught,
    applyFilters,
  };
}
