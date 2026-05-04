import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function PKMDateRange({
  className = "",
  date,
  setDate,
}: {
  className?: string;
  date?: DateRange | undefined;
  setDate: (r: DateRange) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger className={`overflow-auto ${className}`}>
        <Button variant="outline" className="w-full justify-start px-2.5">
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <div className="truncate">
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </div>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
