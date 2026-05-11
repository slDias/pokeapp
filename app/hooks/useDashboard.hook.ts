import { usePokedexStore } from "~/store";

const useDashboard = () => {
  const fullPkmMap = usePokedexStore((state) => state.pokemonList);
  const caughtPkmList = fullPkmMap
    .values()
    .filter((p) => p.caught)
    .toArray();

  const pkmCount = fullPkmMap.size;
  const catchCount = caughtPkmList.length;
  const completionProgress = (catchCount / pkmCount) * 100;

  const last5table = caughtPkmList
    .sort((a, b) => {
      const bDate = new Date(b.caughtDate!).getTime();
      const aDate = new Date(a.caughtDate!).getTime();
      return bDate - aDate;
    })
    .slice(0, 5)
    .map((p) => {
      return {
        id: p.id,
        date: p.caughtDate,
        name: p.name,
        type: p.type,
      };
    });

  return { completionProgress, last5table };
};

export { useDashboard };
