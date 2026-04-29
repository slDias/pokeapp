import { CircleDot, CircleDotDashed } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function PKMCaughtBadge({ value }: { value: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {value ? (
          <CircleDot size={18} />
        ) : (
          <CircleDotDashed size={18} color="gray" />
        )}
      </TooltipTrigger>
      <TooltipContent>
        <span>{value ? "Caught!" : "Not Caught"}</span>
      </TooltipContent>
    </Tooltip>
  );
}
