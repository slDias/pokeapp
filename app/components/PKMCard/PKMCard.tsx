import { Card } from "~/components/ui/card";

export default function PKMCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card className="items-center basis-1/5 gap-0.5">
      <div className="w-16 h-16 border rounded-tr-lg rounded-bl-lg bg-secondary">
        <img src={pokemon.sprite} className="w-32 h-32 -mt-8 object-cover" />
      </div>
      <div>{pokemon.name}</div>
      <div>#{pokemon.id.toString().padStart(3, "0")}</div>
    </Card>
  );
}
