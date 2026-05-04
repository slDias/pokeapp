import { clsx, type ClassValue } from "clsx";
import type { Pokemon as RawPokemon } from "pokeapi-js-wrapper";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// todo: test
export function formatWeight(weightGrams: number): string {
  const kg = (weightGrams / 1000).toFixed(2);
  return `${kg}kg`;
}

export function formatHeight(heightCm: number): string {
  const meters = (heightCm / 100).toFixed(2);
  return `${meters}m`;
}

// todo: ideally this will be part of a hook
export function parsePokemon(p: RawPokemon): Pokemon {
  const pStatsMap = p.stats.reduce(
    (res, stat) => {
      res[stat.stat.name] = stat.base_stat;
      return res;
    },
    {} as { [index: string]: number },
  );

  return {
    id: p.id,
    name: p.name,
    sprite: [p.sprites.front_default!, p.sprites.back_default!], // todo: fallback or leave empty
    caught: false,
    health: pStatsMap["hp"] || 0,
    type: p.types.map((t) => t.type.name),
    weightGrams: p.weight * 100,
    heightCm: p.height * 10,
    speed: pStatsMap["speed"] || 0,
    attack: pStatsMap["attack"] || 0,
    defense: pStatsMap["defense"] || 0,
    specialAttack: pStatsMap["special-attack"] || 0,
    specialDefense: pStatsMap["special-defense"] || 0,
  };
}
