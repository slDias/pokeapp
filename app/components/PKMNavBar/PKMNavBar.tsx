import { ChartNoAxesCombined, CircleFadingPlus, Notebook } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

export default function PKMNavBar() {
  return (
    <ButtonGroup className="w-full h-full">
      <Button variant="outline" className="w-1/2 h-full flex-col gap-0">
        <ChartNoAxesCombined />
        <span className="text-xs">Dashboard</span>
      </Button>
      <Button variant="outline" className="w-1/2 h-full flex-col gap-0">
        <Notebook />
        <span className="text-xs">Pokédex</span>
      </Button>
    </ButtonGroup>
  );
}
