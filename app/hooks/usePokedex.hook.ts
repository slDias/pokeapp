import { useEffect, useState } from "react";
import { Pokedex, type Pokemon as pokeapiPokemon } from "pokeapi-js-wrapper";
import { usePokedexStore } from "~/store";

const api = new Pokedex();

export default function usePokedex() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const setPokemonNameList = usePokedexStore((s) => s.setPokemonNameList);
  const pokemonList = usePokedexStore((s) => s.pokemonList);
  const addToPokemonList = usePokedexStore((s) => s.addToPokemonList);
  const [isPkmListFull, setIsPkmListFull] = useState(false);

  const prefillPkmNames = async () => {
    const pokemonNameList = usePokedexStore.getState().pokemonNameList;
    if (pokemonNameList.length) return;

    setIsLoading(true);

    try {
      const res = await api.getPokemonsList();
      const parsed = res.results.map((p) => p.name);
      setPokemonNameList(parsed);
    } catch {
      setError("Failed to fetch pokeapi data");
    }

    setIsLoading(false);
  };

  const fillPokemonList = async (targetAmount: number) => {
    await prefillPkmNames();

    const pokemonNameList = usePokedexStore.getState().pokemonNameList;

    if (!pokemonNameList.length) return;

    const currentPkmList = usePokedexStore.getState().pokemonList;

    // if list is complete
    if (pokemonNameList.length === currentPkmList.length) {
      setIsPkmListFull(true);
      return;
    }

    setIsLoading(true);

    const startIdx = currentPkmList.length;
    const nameList = pokemonNameList.slice(startIdx, startIdx + targetAmount);

    let rawPokemonsList: pokeapiPokemon[] = [];

    try {
      rawPokemonsList = await Promise.all(
        nameList.map((n) => api.getPokemonByName(n)),
      );
    } catch {
      setError("Failed to fetch pokeapi data");
    }

    rawPokemonsList.forEach((p) => {
      const pStatsMap = p.stats.reduce(
        (res, stat) => {
          res[stat.stat.name] = stat.base_stat;
          return res;
        },
        {} as { [index: string]: number },
      );

      addToPokemonList({
        id: p.id,
        name: p.name,
        sprite: [p.sprites.front_default, p.sprites.back_default],
        caught: false,
        health: pStatsMap["hp"] || 0,
        type: p.types.map((t) => t.type.name),
        weightGrams: p.weight, // todo: check conversion
        heightCm: p.height, // todo: check conversion
        speed: pStatsMap["speed"] || 0,
        attack: pStatsMap["attack"] || 0,
        defense: pStatsMap["defense"] || 0,
        specialAttack: pStatsMap["special-attack"] || 0,
        specialDefense: pStatsMap["special-defense"] || 0,
      } as Pokemon);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    fillPokemonList(10);
  }, []);

  return { pokemonList, fillPokemonList, isPkmListFull, isLoading, error };
}
