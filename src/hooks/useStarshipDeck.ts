import { useCallback, useRef } from "react";
import { fetchStarships } from "../services/swapi";
import { Starship } from "../types/starship";
import { shuffleArray } from "../utils/shuffleArray";

export function useStarshipDeck() {
  const initialDeckRef = useRef<Starship[]>([]);
  const deckRef = useRef<Starship[]>([]);

  const initializeDeck = useCallback(async () => {
    if (initialDeckRef.current.length === 0) {
      initialDeckRef.current = await fetchStarships();
    }

    deckRef.current = shuffleArray(initialDeckRef.current);
  }, []);

  const resetDeck = useCallback(() => {
    deckRef.current = shuffleArray(initialDeckRef.current);
  }, []);

  const drawCards = useCallback((count: number): Starship[] | null => {
    if (count <= 0 || deckRef.current.length < count) {
      return null;
    }

    return deckRef.current.splice(-count);
  }, []);

  return {
    initializeDeck,
    resetDeck,
    drawCards,
  };
}