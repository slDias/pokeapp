import { useState } from "react";

const MIN_HEIGHT = 1.0;
const MAX_HEIGHT = 10000.0;

export default function usePKMHeightSliderHook() {
  const [rangeStart, setRangeStart] = useState(MIN_HEIGHT);
  const [rangeEnd, setRangeEnd] = useState(MAX_HEIGHT);

  const handleValueChange = (nv: number[]) => {
    console.log("slider value changed");
    setRangeStart(nv[0]);
    setRangeEnd(nv[1]);
  };

  return {
    rangeStart,
    rangeEnd,
    min: MIN_HEIGHT,
    max: MAX_HEIGHT,
    handleValueChange,
  };
}
