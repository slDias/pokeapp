export default function PKMIdLabel({
  value,
  className,
}: {
  value: Number;
  className?: string;
}) {
  return (
    <span className={`${className || ""}`}>
      #{value.toString().padStart(4, "0")}
    </span>
  );
}
