import { test as baseTest } from "vitest";
import { pokemon, rawPokemon } from "./commons.test";
import "./mock.test";
import "./mockServer.test";

import { Pokedex as apiMock } from "pokeapi-js-wrapper";
import type { MockAPI } from "./mock.test";

export const test = baseTest
  .extend("pokemon", pokemon)
  .extend("rawPokemon", rawPokemon)
  .extend("apiMock", new apiMock() as unknown as MockAPI);
