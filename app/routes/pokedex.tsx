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
  const {
    syncProgress,
    setFilterIds,
    setSearchIds,
    resultingPokemonList,
    setSortFunc,
  } = usePokedex();

  return (
    <div>
      <div className="border-b px-2 py-4 flex gap-2">
        <PKMSearch setSearchIds={setSearchIds} className="gap-1 grow" />
        <div className="flex flex-col shrink gap-1">
          <PKMSortMenu setSortFunc={setSortFunc} />
          <PKMFilterDialog setFilterIds={setFilterIds} />
        </div>
      </div>
      {syncProgress != 100 && <Progress value={syncProgress} />}
      <div className="grid mx-2 my-4 grid-cols-3 gap-2">
        {resultingPokemonList.map((p) => (
          <Link to={`/pokemon/${p.id}`} key={p.id}>
            <PKMCard pokemon={p} />
          </Link>
        ))}
      </div>
      {!resultingPokemonList.length && (
        <div className="text-center opacity-60">
          <span>No pokémons matches your filters</span>
        </div>
      )}
    </div>
  );
}
