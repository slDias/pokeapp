import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

export default function PKMNavBar() {
  return (
    <ButtonGroup className="w-full h-full">
      <Button variant="outline" className="w-1/3 h-full">
        Dash
      </Button>
      <Button variant="outline" className="w-1/3 h-full">
        Capt
      </Button>
      <Button variant="outline" className="w-1/3 h-full">
        List
      </Button>
    </ButtonGroup>
  );
}
