import { useState } from "react";
import { usePokedexStore } from "~/store";
import { usePKMHeightSlider } from "~/components/PKMHeightSlider/usePKMHeightSlider.hook";
import usePKMTypeSelect from "~/components/PKMTypeSelect/usePKMTypeSelect";
import { useDateRangePicker } from "~/components/PKMDateRangePicker/useDateRangePicker.hook";
import type { DateRange } from "react-day-picker";

const MIN_HEIGHT = 10.0;
const MAX_HEIGHT = 10000.0;

export default function usePKMFilterDialog(
  setFilterIds: (ids: Set<number>) => void,
) {
  const pokemonList = usePokedexStore((state) => state.pokemonList);

  const [heightRange, setHeightRange] = useState<number[]>([
    MIN_HEIGHT,
    MAX_HEIGHT,
  ]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [onlyCaught, setOnlyCaught] = useState(false);

  const sliderHook = usePKMHeightSlider(
    heightRange,
    setHeightRange,
    MIN_HEIGHT,
    MAX_HEIGHT,
  );
  const typeSelectHook = usePKMTypeSelect(selectedType, setSelectedType);
  const dateRangePickerHook = useDateRangePicker(dateRange, setDateRange);

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
    setFilterIds(
      new Set(
        pokemonList
          .values()
          .filter(heightFilter)
          .filter(typeFilter)
          .filter(dateFilter)
          .filter(caughtFilter)
          .map((p) => p.id),
      ),
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
