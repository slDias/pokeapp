import { CalendarIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { type useDateRangePicker } from "./useDateRangePicker.hook";

type PKMDateRangeProps = {
  className?: string;
  hook: ReturnType<typeof useDateRangePicker>;
};

const PKMDateRangePicker = ({ className = "", hook }: PKMDateRangeProps) => (
  <Popover>
    <div className={`${className} grow overflow-auto`}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <CalendarIcon />
          {hook.isEmpty ? (
            <span>Pick a date</span>
          ) : (
            <div className="truncate">
              {hook.dateRange.from!.toLocaleDateString()}
              {hook.dateRange.to && (
                <span> - {hook.dateRange.to.toLocaleDateString()}</span>
              )}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      {!hook.isEmpty && (
        <Button onClick={hook.reset} variant={"ghost"} className="shrink">
          <X></X>
        </Button>
      )}
    </div>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        required
        mode="range"
        selected={hook.dateRange}
        onSelect={hook.setDateRange}
        numberOfMonths={1}
      />
    </PopoverContent>
  </Popover>
);

export { PKMDateRangePicker };
