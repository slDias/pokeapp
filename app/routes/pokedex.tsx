import type { Route } from "./+types/pokedex";
import { Link } from "react-router";
import PKMCard from "~/components/PKMCard/PKMCard";
import PKMFilter from "~/components/PKMFilter/PKMFilter";
import { Button } from "~/components/ui/button";
import usePokedex from "~/hooks/usePokedex.hook";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pokédex" }];
}

export default function Pokedex() {
  const { pokemonList, fillPokemonList, isLoading, isPkmListFull } =
    usePokedex();

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
      <div className="flex w-full justify-center my-4">
        {isLoading
          ? "loading..."
          : !isPkmListFull && (
              <Button
                className="px-4"
                variant="outline"
                onClick={(_) => fillPokemonList(10)}
              >
                Load more
              </Button>
            )}
      </div>
    </div>
  );
}
