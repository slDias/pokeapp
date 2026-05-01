import { useState } from "react";
import { FieldLabel } from "../ui/field";
import { Slider } from "../ui/slider";

const MIN_HEIGHT = 0.1;
const MAX_HEIGHT = 100.0;

export default function PKMHeightSlider({
  className = "",
}: {
  className?: string;
}) {
  // todo
  const [rangeStart, setRangeStart] = useState(MIN_HEIGHT);
  const [rangeEnd, setRangeEnd] = useState(MAX_HEIGHT);

  const handleValueChange = (nv: number[]) => {
    setRangeStart(nv[0]);
    setRangeEnd(nv[1]);
  };

  return (
    <div className={className}>
      <div className="flex flex-row justify-between">
        <FieldLabel>Height</FieldLabel>
        <div>
          from <span>{rangeStart}</span> {/* todo: connect */}
          to <span>{rangeEnd}</span>
        </div>
      </div>
      <Slider
        defaultValue={[MIN_HEIGHT, MAX_HEIGHT]}
        step={0.1}
        value={[rangeStart, rangeEnd]}
        onValueChange={(nv) => handleValueChange(nv)}
      />
    </div>
  );
}
