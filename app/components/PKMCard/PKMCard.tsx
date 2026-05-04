import { Card } from "~/components/ui/card";
import PKMIdLabel from "../PKMIdLabel";
import PKMCaughtBadge from "../PKMCaughtBadge";

export default function PKMCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card
      className={`basis-1/5 rounded-tl-none rounded-br-none gap-0.5 p-2 ${!pokemon.caught && "opacity-55 grayscale-75"}`}
    >
      <div className="self-center w-24 h-24 border rounded-tr-xl rounded-bl-xl bg-secondary">
        {/*<img src={pokemon.sprite[0]} /> */}
      </div>
      <div className="truncate">{pokemon.name}</div>
      <div className="flex items-center justify-between">
        <PKMIdLabel value={pokemon.id} />
        <PKMCaughtBadge value={pokemon.caught} />
      </div>
    </Card>
  );
}
