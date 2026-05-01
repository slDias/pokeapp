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

export default function PKMFilterDialog() {
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
          <PKMHeightSlider className="flex flex-col gap-2" />
        </Field>
        <Field>
          <div className="flex">
            <FieldLabel className="basis-1/3">Type</FieldLabel>
            <PKMSelect />
          </div>
        </Field>
        <Field>
          <div className="flex">
            <FieldLabel className="basis-1/3">Caught Date</FieldLabel>
            <PKMDateRange className="basis-2/3" />
          </div>
        </Field>
        <Field>
          <div className="flex">
            <FieldLabel className="basis-1/3">Caught Only</FieldLabel>
            <Switch />
          </div>
        </Field>
        <DialogFooter>
          <DialogClose>
            <Button className="w-full">Apply</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
