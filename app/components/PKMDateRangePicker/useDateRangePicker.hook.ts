import type { DateRange } from "react-day-picker";

const useDateRangePicker = (
  dateRange: DateRange,
  setDateRange: (dr: DateRange) => void,
) => {
  const isEmpty = !dateRange.from && !dateRange.to;
  const reset = () => setDateRange({ from: undefined, to: undefined });
  return { dateRange, setDateRange, isEmpty, reset };
};

export { useDateRangePicker };
