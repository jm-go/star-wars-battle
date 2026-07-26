import { Starship } from "../types/starship";

const BASE_URL = "https://swapi.info/api/starships";

export async function fetchStarships(): Promise<Starship[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch starships");
  }

  return response.json();
}