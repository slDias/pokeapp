import { clsx, type ClassValue } from "clsx";
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
