import { useState } from "react";
import { usePokedexStore } from "~/store";

const usePKMNoteDialog = (pokemonId: number, note?: Note, idx?: number) => {
  const [content, setContent] = useState<string>(note?.content || "");

  const saveNote = (note: string) => {
    const state = usePokedexStore.getState();
    if (idx === undefined) state.addNote(pokemonId, note);
    else state.editNote(pokemonId, idx, content);
  };

  return {
    pokemonId,
    saveNote,
    content,
    setContent,
  };
};

export { usePKMNoteDialog };
