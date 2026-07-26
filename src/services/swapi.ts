import { Starship } from "../types/starship";

const BASE_URL = "https://swapi.info/api/starships";
let initialStarshipsDeck: Starship[] = [];
let starshipsDeck: Starship[] = [];

/**
 * Fisher-Yates shuffle algorithm for randomization
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Fetch all starships from the API once and store as initial deck
 */
export async function initializeStarshipsDeck(): Promise<void> {
  if (initialStarshipsDeck.length === 0) {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch starships");
    }

    initialStarshipsDeck = await response.json();
  }

  // Create a shuffled copy from the initial deck
  starshipsDeck = shuffleArray(initialStarshipsDeck);
}

/**
 * Get the next starship from the shuffled deck
 * Returns null if deck is empty
 */
export function getNextStarship(): Starship | null {
  if (starshipsDeck.length === 0) {
    return null;
  }
  const starship = starshipsDeck.pop() || null;
  return starship;
}

/**
 * Reset and reshuffle the deck using the original fetched data
 */
export async function resetDeck(): Promise<void> {
  starshipsDeck = shuffleArray(initialStarshipsDeck);
}

/**
 * Get numeric value for comparison
 */
export function getNumericValue(starship: Starship, category: string): number {
  const parseNumericString = (value: string): number => {
    if (value === "n/a" || value === "unknown") return 0;
    const numbersOnly = value.replace(/[^\d]/g, "");
    return parseInt(numbersOnly) || 0;
  };

  switch (category) {
    case "max_atmosphering_speed":
      return parseNumericString(starship.max_atmosphering_speed);
    case "cost_in_credits":
      return parseNumericString(starship.cost_in_credits);
    case "passengers":
      return parseNumericString(starship.passengers);
    case "films":
      return starship.films.length;
    default:
      return 0;
  }
}
