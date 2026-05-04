import { useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import { usePokedexStore } from "~/store";
import { toast } from "sonner";
import { parsePokemon } from "~/lib/utils";

const api = new Pokedex();

export default function usePokemon(pokemonId: number) {
  const [isLoading, setIsLoading] = useState(true);
  const pokemonList = usePokedexStore((s) => s.pokemonList);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  /* todo */
  const [showDialog, setShowDialog] = useState(false);

  const fetchPokemon = async () => {
    let cachedPokemon = pokemonList.find((p) => p.id === pokemonId);

    if (cachedPokemon) {
      setIsLoading(false);
      setPokemon(cachedPokemon);
      return;
    }

    let res = await api.getPokemonByName(pokemonId);
    setPokemon(parsePokemon(res));
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return { pokemon, showDialog, setShowDialog, isLoading };
}
