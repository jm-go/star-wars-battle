import { useState, useEffect, useCallback } from "react";
import { Starship, CategoryKey } from "../types/starship";
import {
  initializeStarshipsDeck,
  getNextStarship,
  resetDeck,
  getNumericValue,
} from "../services/swapi";
import { GAME_MESSAGES, MessageKey, GameMessage } from "../constants/messages";

const TIMINGS = {
  RESULT_DISPLAY: 1200,
  ROUND_TRANSITION: 3000,
} as const;

export function useStarWarsGame() {
  const [userCard, setUserCard] = useState<Starship | null>(null);
  const [computerCard, setComputerCard] = useState<Starship | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [messageKey, setMessageKey] = useState<MessageKey | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initGame = useCallback(async () => {
    setIsLoading(true);
    try {
      await initializeStarshipsDeck();
      setUserCard(getNextStarship());
      setComputerCard(getNextStarship());
      setError(null);
    } catch (error) {
      console.error("Error initializing game:", error);
      setError("Error loading game. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadNewCard = useCallback((player: "user" | "computer") => {
    const starship = getNextStarship();

    if (!starship) {
      setMessageKey("GAME_OVER");
      return;
    }

    if (player === "user") {
      setUserCard(starship);
    } else {
      setComputerCard(starship);
    }
  }, []);

  const resetGameState = useCallback(() => {
    setUserCard(getNextStarship());
    setComputerCard(getNextStarship());
    setUserScore(0);
    setComputerScore(0);
    setMessageKey(null);
    setSelectedCategory(null);
    setGameStarted(false);
    setError(null);
  }, []);

  // Compare cards when category is selected
  useEffect(() => {
    if (!userCard || !computerCard || !selectedCategory) return;

    const userValue = getNumericValue(userCard, selectedCategory);
    const computerValue = getNumericValue(computerCard, selectedCategory);

    if (userValue > computerValue) {
      setUserScore((prev) => prev + 1);
      setMessageKey("WIN");
    } else if (userValue < computerValue) {
      setComputerScore((prev) => prev + 1);
      setMessageKey("LOSE");
    } else {
      setMessageKey("DRAW");
    }

    const timer1 = setTimeout(() => setMessageKey("GET_READY"), TIMINGS.RESULT_DISPLAY);
    const timer2 = setTimeout(() => {
      setSelectedCategory(null);
      setMessageKey(null);
      loadNewCard("user");
      loadNewCard("computer");
    }, TIMINGS.ROUND_TRANSITION);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [userCard, computerCard, selectedCategory, loadNewCard]);

  const handleCategoryClick = useCallback((category: CategoryKey) => {
    if (isLoading || !userCard || !computerCard || selectedCategory) return;

    setSelectedCategory(category);
    setMessageKey(null);
  }, [isLoading, userCard, computerCard, selectedCategory]);

  const handleStart = useCallback(async () => {
    setGameStarted(true);
    await initGame();
  }, [initGame]);

  const handleReset = useCallback(async () => {
    setIsLoading(true);
    try {
      await resetDeck();
      resetGameState();
    } catch (error) {
      console.error("Error resetting game:", error);
      setError("Error resetting game. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, [resetGameState]);

  const currentMessage: GameMessage | null = messageKey
    ? GAME_MESSAGES[messageKey]
    : null;

  const gameOver = messageKey === "GAME_OVER";

  return {
    userCard,
    computerCard,
    userScore,
    computerScore,
    message: currentMessage,
    selectedCategory,
    isLoading,
    gameStarted,
    gameOver,
    error,
    handleCategoryClick,
    handleStart,
    handleReset,
  };
}
