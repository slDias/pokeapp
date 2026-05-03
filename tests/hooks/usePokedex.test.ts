import { describe, expect, vi, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import mockPokeAPI from "../mockPokeAPI";
import usePokedex from "~/hooks/usePokedex.hook";
import { test } from "../base";

describe("Test usePokedexState hook", () => {
  beforeEach(() => {
    mockPokeAPI.mockReset();
  });

  test("Test initial state fills pokemon list", async ({ rawPokemon }) => {
    mockPokeAPI.prototype.getPokemonsList = vi.fn().mockImplementation(() => ({
      results: [{ name: rawPokemon.name }],
    }));
    mockPokeAPI.prototype.getPokemonByName = vi
      .fn()
      .mockResolvedValue(rawPokemon);
    const { result, rerender } = renderHook(() => usePokedex());

    await act(rerender);

    expect(mockPokeAPI.prototype.getPokemonsList).toHaveBeenCalledOnce();
    expect(result.current.pokemonList.length).toEqual(1);
    expect(
      mockPokeAPI.prototype.getPokemonByName,
    ).toHaveBeenCalledExactlyOnceWith(rawPokemon.name);

    const pkm = result.current.pokemonList[0];
    expect(pkm.id).toEqual(rawPokemon.id);
    expect(pkm.name).toEqual(rawPokemon.name);
    expect(pkm.sprite).toEqual([
      rawPokemon.sprites.front_default,
      rawPokemon.sprites.back_default,
    ]);
    expect(pkm.caught).toEqual(false);
    expect(pkm.health).toEqual(
      rawPokemon.stats.find((s) => s.stat.name === "hp")!.base_stat,
    );
    expect(pkm.type).toEqual(rawPokemon.types.map((t) => t.type.name));
    expect(pkm.weightGrams).toEqual(rawPokemon.weight);
    expect(pkm.heightCm).toEqual(rawPokemon.height);
    expect(pkm.speed).toEqual(
      rawPokemon.stats.find((s) => s.stat.name === "speed")!.base_stat,
    );
    expect(pkm.attack).toEqual(
      rawPokemon.stats.find((s) => s.stat.name === "attack")!.base_stat,
    );
    expect(pkm.defense).toEqual(
      rawPokemon.stats.find((s) => s.stat.name === "defense")!.base_stat,
    );
    expect(pkm.specialAttack).toEqual(
      rawPokemon.stats.find((s) => s.stat.name === "special-attack")!.base_stat,
    );
    expect(pkm.specialDefense).toEqual(
      rawPokemon.stats.find((s) => s.stat.name === "special-defense")!
        .base_stat,
    );
  });

  test("Test fill after initial state", async ({ rawPokemon }) => {
    mockPokeAPI.prototype.getPokemonsList = vi.fn().mockImplementation(() => ({
      results: [{ name: rawPokemon.name }],
    }));
    mockPokeAPI.prototype.getPokemonByName = vi
      .fn()
      .mockResolvedValue(rawPokemon);
    const { result, rerender } = renderHook(() => usePokedex());

    await act(rerender);
    await act(() => result.current.fillPokemonList(1));

    expect(result.current.pokemonList.length).toEqual(1);
  });

  test("Test fills matches pokemon name list", async ({ rawPokemon }) => {
    const listNameMock = vi.fn();
    listNameMock.mockImplementation(() => ({
      results: [],
    }));
    mockPokeAPI.prototype.getPokemonsList = listNameMock;
    mockPokeAPI.prototype.getPokemonByName = vi
      .fn()
      .mockResolvedValue(rawPokemon);
    const { result, rerender } = renderHook(() => usePokedex());

    await act(rerender);
    await act(() => result.current.fillPokemonList(1));

    expect(result.current.pokemonList.length).toEqual(0);

    listNameMock.mockReset();
    listNameMock.mockImplementation(() => ({
      results: [{ name: rawPokemon.name }],
    }));

    await act(() => result.current.fillPokemonList(1));

    expect(result.current.pokemonList.length).toEqual(1);
  });

  // todo test startIdx + targetamount
  // test isloading (maybe through mockImplementation)
  // test isfull
});
