import { useState } from "react";
import PKMCard from "~/components/PKMCard/PKMCard";
import PKMFilter from "~/components/PKMFilter/PKMFilter";

export default function PKMList() {
  // todo: this is temporary mock to test the design.
  let pArray = new Array(50).fill(null);

  const [pokemonList, setPokemonList] = useState(
    pArray.map((v) => ({
      id: 1,
      name: "Bulbasaur",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    })),
  );

  return (
    <div>
      <PKMFilter />
      <div className="grid m-2 grid-cols-4 gap-2">
        {pokemonList.map((p) => (
          <PKMCard pokemon={p} />
        ))}
      </div>
    </div>
  );
}
