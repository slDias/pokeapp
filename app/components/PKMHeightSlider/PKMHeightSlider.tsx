import { FieldLabel } from "../ui/field";
import { Slider } from "../ui/slider";

export default function PKMHeightSlider({
  className = "",
  rangeStart,
  setRangeStart,
  rangeEnd,
  setRangeEnd,
  min,
  max,
}: {
  className?: string;
  rangeStart: number;
  setRangeStart: (nv: number) => void;
  rangeEnd: number;
  setRangeEnd: (nv: number) => void;
  min: number;
  max: number;
}) {
  // todo
  /*const [rangeStart, setRangeStart] = useState(MIN_HEIGHT);
  const [rangeEnd, setRangeEnd] = useState(MAX_HEIGHT);*/

  const handleValueChange = (nv: number[]) => {
    setRangeStart(nv[0]);
    setRangeEnd(nv[1]);
  };

  return (
    <div className={className}>
      <div className="flex flex-row justify-between">
        <FieldLabel>Height</FieldLabel>
        <div>
          from <span>{rangeStart}cm</span> {/* todo: connect */}
          to <span>{rangeEnd}cm</span>
        </div>
      </div>
      <Slider
        defaultValue={[min, max]}
        min={min}
        max={max}
        step={10}
        value={[rangeStart, rangeEnd]}
        onValueChange={(nv) => handleValueChange(nv)}
      />
    </div>
  );
}
