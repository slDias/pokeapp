const usePKMHeightSlider = (
  range: Array<number>,
  setRange: (r: Array<number>) => void,
  min: number,
  max: number,
) => {
  const handleValueChange = setRange;

  return {
    rangeStart: range[0],
    rangeEnd: range[1],
    min,
    max,
    handleValueChange,
  };
};

export { usePKMHeightSlider };
