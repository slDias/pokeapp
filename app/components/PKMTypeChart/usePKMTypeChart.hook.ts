import { type ChartConfig } from "~/components/ui/chart";
import { usePokedexStore } from "~/store";

const usePKMTypeChart = () => {
  const pkmTypeList = usePokedexStore((state) => state.pokemonTypeList);
  const fullPkmMap = usePokedexStore((state) => state.pokemonList);

  const pkmByType = fullPkmMap
    .values()
    .filter((p) => p.caught)
    .reduce((res, p) => {
      p.type.forEach((t) => {
        if (res.has(t)) res.set(t, res.get(t)! + 1);
        else res.set(t, 1);
      });

      return res;
    }, new Map<string, number>([]));

  const chartData = pkmByType
    .entries()
    .map(([k, v]) => ({
      type: k,
      pokemons: v,
    }))
    .toArray();

  const chartConfig = pkmTypeList.reduce(
    (res, t) => {
      res[t] = { label: `${t[0].toUpperCase()}${t.slice(1)}` };
      return res;
    },
    {
      pokemons: {
        label: "Pokemons",
      },
    } as { [index: string]: { label: string } },
  ) satisfies ChartConfig;

  return { chartData, chartConfig };
};

export { usePKMTypeChart };
