import { describe, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { test } from "../describe.test";
import { usePokedexStore } from "~/store";

describe("Test usePokedexState hook", () => {
  test("sync calls underlying store's sync", async ({
    rawPokemon,
    apiMock,
  }) => {
    const { result, rerender } = await act(() =>
      renderHook(() => usePokedexStore()),
    );

    await act(async () => {
      result.current.sync();
      rerender();
    });

    expect(apiMock.getPokemonsList).toHaveBeenCalledOnce();
    expect(apiMock.getTypesList).toHaveBeenCalledOnce();
    expect(apiMock.getPokemonByName).toHaveBeenCalledOnce();
    expect(apiMock.getPokemonByName.mock.calls).toHaveLength(1);
    expect(apiMock.getPokemonByName.mock.calls[0]).toBeOneOf([
      [rawPokemon.id],
      [rawPokemon.name],
    ]);
  });
});
