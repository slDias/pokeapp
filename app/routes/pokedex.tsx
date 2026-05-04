import { useEffect } from "react";
import type { Route } from "./+types/pokedex";
import { Link } from "react-router";
import PKMCard from "~/components/PKMCard/PKMCard";
import PKMFilter from "~/components/PKMFilter/PKMFilter";
import usePokedex from "~/hooks/usePokedex.hook";
import { Progress } from "~/components/ui/progress";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pokédex" }];
}

export default function Pokedex() {
  const { pokemonList, syncProgress, setIdFilter, idFilter } = usePokedex();

  return (
    <div>
      <PKMFilter setFilterIdList={setIdFilter} />
      {syncProgress != 100 && <Progress value={syncProgress} />}
      <div className="grid mx-2 my-4 grid-cols-3 gap-2">
        {
          //todo: .filter on id
        }
        {pokemonList
          .filter((p) => !idFilter.size || idFilter.has(p.id))
          .map((p) => (
            <Link to={`/pokemon/${p.id}`} key={p.id}>
              <PKMCard pokemon={p} />
            </Link>
          ))}
      </div>
    </div>
  );
}
