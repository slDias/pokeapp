import { useEffect, useState } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import { usePokedexStore } from "~/store";
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
      if (typeof cachedPokemon.caughtDate === "string")
        cachedPokemon.caughtDate = new Date(cachedPokemon.caughtDate);
      setPokemon(cachedPokemon);
      return;
    }

    let res = await api.getPokemonByName(pokemonId);
    setPokemon(parsePokemon(res));
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const setCaught = () => {
    if (!pokemon) return;
    let caught = !pokemon.caught;
    let caughtDate = caught ? new Date() : undefined;
    const newPkm = { ...pokemon, caught, caughtDate };
    usePokedexStore.getState().updatePokemon(newPkm);
    setPokemon(newPkm);
  };

  const saveNote = (newNote: Note, idx?: number) => {
    if (!pokemon) return;
    newNote.createdDate = new Date();
    let newNoteList = pokemon.notes || [];
    if (idx === undefined) newNoteList.push(newNote);
    else newNoteList[idx] = newNote;
    const newPkm = { ...pokemon, notes: newNoteList } as Pokemon;
    usePokedexStore.getState().updatePokemon(newPkm);
    setPokemon(newPkm);
  };

  return { pokemon, showDialog, setShowDialog, isLoading, setCaught, saveNote };
}
