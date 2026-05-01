import { ChartNoAxesCombined, Notebook } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Link } from "react-router";

export default function PKMNavBar() {
  return (
    <ButtonGroup className="w-full h-full">
      <Button variant="outline" className="w-1/2 h-full ">
        <Link
          to="/"
          className="size-full flex flex-col items-center justify-center"
        >
          <Notebook />
          <span className="text-xs">Pokédex</span>
        </Link>
      </Button>
      <Button variant="outline" className="w-1/2 h-full">
        <Link
          to="/dashboard"
          className="size-full flex flex-col items-center justify-center"
        >
          <ChartNoAxesCombined />
          <span className="text-xs">Dashboard</span>
        </Link>
      </Button>
    </ButtonGroup>
  );
}
