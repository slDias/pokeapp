import { FieldLabel } from "../ui/field";
import { Slider } from "../ui/slider";
import { type usePKMHeightSlider } from "./usePKMHeightSlider.hook";

type PKMHeightSliderProps = {
  className?: string;
  hook: ReturnType<typeof usePKMHeightSlider>;
};

const PKMHeightSlider = ({ className = "", hook }: PKMHeightSliderProps) => (
  <div className={className}>
    <div className="flex flex-row justify-between">
      <FieldLabel>Height</FieldLabel>
      <div>
        from <span>{hook.rangeStart}cm</span> to <span>{hook.rangeEnd}cm</span>
      </div>
    </div>
    <Slider
      defaultValue={[hook.min, hook.max]}
      min={hook.min}
      max={hook.max}
      step={10}
      value={[hook.rangeStart, hook.rangeEnd]}
      onValueChange={hook.handleValueChange}
    />
  </div>
);

export default PKMHeightSlider;
