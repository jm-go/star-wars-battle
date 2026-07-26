import { useCallback, useEffect, useState } from "react";
import { GAME_MESSAGES, MessageKey } from "../constants/messages";
import { CategoryKey, Starship } from "../types/starship";
import { getNumericValue } from "../utils/getNumericValue";
import { useStarshipDeck } from "./useStarshipDeck";

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
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { initializeDeck, resetDeck, drawCards } = useStarshipDeck();

  const loadNextRound = useCallback(() => {
    const cards = drawCards(2);

    if (!cards) {
      setSelectedCategory(null);
      setMessageKey("GAME_OVER");
      return;
    }

    const [nextUserCard, nextComputerCard] = cards;

    setUserCard(nextUserCard);
    setComputerCard(nextComputerCard);
  }, [drawCards]);

  const resetGameValues = useCallback(() => {
    setUserScore(0);
    setComputerScore(0);
    setSelectedCategory(null);
    setMessageKey(null);
    setError(null);
  }, []);

  const handleStart = useCallback(async () => {
    setIsLoading(true);
    setGameStarted(true);

    try {
      await initializeDeck();
      resetGameValues();
      loadNextRound();
    } catch (error) {
      console.error("Error initializing game:", error);
      setError("Error loading game. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, [initializeDeck, loadNextRound, resetGameValues]);

  const handleReset = useCallback(() => {
    resetDeck();
    resetGameValues();
    setGameStarted(true);
    loadNextRound();
  }, [loadNextRound, resetDeck, resetGameValues]);

  useEffect(() => {
    if (!userCard || !computerCard || !selectedCategory) {
      return;
    }

    const userValue = getNumericValue(userCard, selectedCategory);
    const computerValue = getNumericValue(computerCard, selectedCategory);

    if (userValue > computerValue) {
      setUserScore((previousScore) => previousScore + 1);
      setMessageKey("WIN");
    } else if (userValue < computerValue) {
      setComputerScore((previousScore) => previousScore + 1);
      setMessageKey("LOSE");
    } else {
      setMessageKey("DRAW");
    }

    const resultTimer = window.setTimeout(() => {
      setMessageKey("GET_READY");
    }, TIMINGS.RESULT_DISPLAY);

    const nextRoundTimer = window.setTimeout(() => {
      setSelectedCategory(null);
      setMessageKey(null);
      loadNextRound();
    }, TIMINGS.ROUND_TRANSITION);

    return () => {
      window.clearTimeout(resultTimer);
      window.clearTimeout(nextRoundTimer);
    };
  }, [computerCard, loadNextRound, selectedCategory, userCard]);

  const handleCategoryClick = useCallback(
    (category: CategoryKey) => {
      if (
        isLoading ||
        !userCard ||
        !computerCard ||
        selectedCategory !== null
      ) {
        return;
      }

      setSelectedCategory(category);
      setMessageKey(null);
    },
    [computerCard, isLoading, selectedCategory, userCard]
  );

  const currentMessage = messageKey ? GAME_MESSAGES[messageKey] : null;
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
