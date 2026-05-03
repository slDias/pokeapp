import { describe, test, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { usePokedexStore } from "~/store";

describe("Test usePokedexState hook", () => {
  const expectedList = Array.from({ length: 5 }, () => crypto.randomUUID());

  test("Test set name list", async () => {
    const { result } = renderHook(() => usePokedexStore());

    act(() => result.current.setPokemonNameList(expectedList));

    expect(result.current.pokemonNameList.length).toBe(5);
    expect(result.current.pokemonNameList.sort()).toEqual(expectedList.sort());
    expect(localStorage.getItem("pokemon-name")).not.toBeNull();
  });

  test("Test get name list from storage", () => {
    localStorage.setItem(
      "pokemon-name",
      JSON.stringify({
        state: { pokemonNameList: expectedList },
      }),
    );
    const { result, rerender } = renderHook(() => usePokedexStore());
    usePokedexStore.persist.rehydrate();

    rerender();

    expect(result.current.pokemonNameList).toStrictEqual(expectedList);
  });

  test("Test add to pokemon list", () => {
    const preExistingPkm = { id: 2 };
    localStorage.setItem(
      "pokemon-name",
      JSON.stringify({ state: { pokemonList: [preExistingPkm] } }),
    );
    usePokedexStore.persist.rehydrate();
    const { result } = renderHook(() => usePokedexStore());
    const newPkm = {
      id: 1,
      name: "bulbasaur",
      sprite: ["url.to/image.png"],
      caught: false,
      health: 10,
      type: ["grass"],
      weightGrams: 10,
      heightCm: 10,
      speed: 10,
      attack: 10,
      defense: 10,
      specialAttack: 10,
      specialDefense: 10,
    };

    act(() => result.current.addToPokemonList(newPkm));

    expect(result.current.pokemonList.length).toBe(2);
    expect(result.current.pokemonList[0]).toStrictEqual(preExistingPkm);
    expect(result.current.pokemonList[1]).toStrictEqual(newPkm);
    expect(localStorage.getItem("pokemon-name")).not.toBeNull();
  });
});
