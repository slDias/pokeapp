import type { Route } from "./+types/pokedex";
import { Link } from "react-router";
import { PKMCard } from "~/components/PKMCard/PKMCard";
import usePokedex from "~/hooks/usePokedex.hook";
import { Progress } from "~/components/ui/progress";
import PKMSortMenu from "~/components/PKMSortMenu/PKMSortMenu";
import PKMFilterDialog from "~/components/PKMFilterDialog/PKMFilterDialog";
import { PKMSearch } from "~/components/PKMSearch/PKMSearch";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Pokédex" }];
}

export default function Pokedex() {
  const { filteredPokemonList, setFilteredPokemon, syncProgress } =
    usePokedex();

  return (
    <div>
      <div className="border-b px-2 py-4 flex gap-2">
        <PKMSearch
          filteredPokemonList={filteredPokemonList}
          setFilteredPokemon={setFilteredPokemon}
          className="gap-1 grow"
        />
        <div className="flex flex-col shrink gap-1">
          <PKMSortMenu />
          <PKMFilterDialog setFilteredPokemon={setFilteredPokemon} />
        </div>
      </div>
      {syncProgress != 100 && <Progress value={syncProgress} />}
      <div className="grid mx-2 my-4 grid-cols-3 gap-2">
        {filteredPokemonList.map((p) => (
          <Link to={`/pokemon/${p.id}`} key={p.id}>
            <PKMCard pokemon={p} />
          </Link>
        ))}
      </div>
      {!filteredPokemonList.length && (
        <div className="text-center opacity-60">
          <span>No pokémons matches your filters</span>
        </div>
      )}
    </div>
  );
}
