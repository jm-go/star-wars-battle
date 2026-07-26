import { CategoryKey, Starship } from "../types/starship";

function parseNumericString(value: string): number {
  if (value === "n/a" || value === "unknown") {
    return 0;
  }

  const numbersOnly = value.replace(/[^\d]/g, "");

  return Number.parseInt(numbersOnly, 10) || 0;
}

export function getNumericValue(
  starship: Starship,
  category: CategoryKey
): number {
  switch (category) {
    case "max_atmosphering_speed":
      return parseNumericString(starship.max_atmosphering_speed);

    case "cost_in_credits":
      return parseNumericString(starship.cost_in_credits);

    case "passengers":
      return parseNumericString(starship.passengers);

    case "films":
      return starship.films.length;
  }
}