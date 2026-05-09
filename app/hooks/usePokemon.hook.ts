import { useEffect, useState } from "react";
import { usePokedexStore } from "~/store";

export default function usePokemon(pokemonId: number) {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    usePokedexStore.getState().syncPokemon(pokemonId);
  }, []);

  const setCaught = (caught: boolean) => {
    const state = usePokedexStore.getState();
    if (caught) state.catchPokemon(pokemonId);
    else state.releasePokemon(pokemonId);
  };

  const saveNote = (note: Note, idx?: number) => {
    const state = usePokedexStore.getState();
    if (idx) state.editNote(pokemonId, idx, note);
    else state.addNote(pokemonId, note);
  };

  const pokemonList = usePokedexStore((state) => state.pokemonList);
  const pokemon = pokemonList.get(pokemonId);
  const isLoading = pokemon === undefined;

  return { pokemon, showDialog, setShowDialog, isLoading, setCaught, saveNote };
}
