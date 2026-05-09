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
import PKMSelect from "../PKMTypeSelect/PKMTypeSelect";
import PKMDateRange from "../PKMDateRange/PKMDateRange";
import PKMHeightSlider from "../PKMHeightSlider/PKMHeightSlider";

import { Checkbox } from "../ui/checkbox";
import usePKMFilterDialogHook from "./usePKMFilterDialog.hook";

export default function PKMFilterDialog({
  setFilteredPokemon,
}: {
  setFilteredPokemon: (pkms: Pokemon[]) => void;
}) {
  const {
    sliderHook,
    typeSelectHook,
    dateRangePickerHook,
    onlyCaught,
    setOnlyCaught,
    applyFilters,
  } = usePKMFilterDialogHook(setFilteredPokemon);

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
          <PKMHeightSlider hook={sliderHook} className="flex flex-col gap-2" />
        </Field>
        <Field>
          <div className="flex">
            <FieldLabel className="basis-1/3">Type</FieldLabel>
            <PKMSelect hook={typeSelectHook} />
          </div>
        </Field>
        <Field>
          <div className="flex">
            <FieldLabel className="basis-1/3">Caught Date</FieldLabel>
            <PKMDateRange
              hook={dateRangePickerHook}
              className="basis-2/3 flex max-w-2/3"
            />
          </div>
        </Field>
        <Field>
          <div className="flex">
            <FieldLabel className="basis-1/3">Caught Only</FieldLabel>
            <Checkbox
              checked={onlyCaught}
              onCheckedChange={(c) => setOnlyCaught(!onlyCaught)}
            />
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
