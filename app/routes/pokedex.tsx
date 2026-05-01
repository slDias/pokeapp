import type { Route } from "./+types/pokedex";
import { useState } from "react";
import { Link } from "react-router";
import PKMCard from "~/components/PKMCard/PKMCard";
import PKMFilter from "~/components/PKMFilter/PKMFilter";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pokédex" }];
}

export default function Pokedex() {
  // todo: this is temporary mock to test the design.
  let pArray = new Array(50).fill(null);

  const [pokemonList, setPokemonList] = useState(
    pArray.map((v, i) => ({
      id: i + 1,
      name: "Crabominableaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      sprite: [
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
      ],
      caught: Math.random() < 0.5,
      health: 100,
      type: ["plant", "venom"],
      weightGrams: 7500,
      heightCm: 102,
      speed: 35,
      attack: 49,
      defense: 45,
      specialAttack: 65,
      specialDefense: 45,
      caughtDate: new Date("2026-04-29T15:33:18.243Z"),
    })),
  );

  return (
    <div>
      <PKMFilter />
      <div className="grid m-2 grid-cols-3 gap-2">
        {pokemonList.map((p, i) => (
          <Link to={`/pokemon/${p.id}`} key={i}>
            <PKMCard pokemon={p} />
          </Link>
        ))}
      </div>
    </div>
  );
}
