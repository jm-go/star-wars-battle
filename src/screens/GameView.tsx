import {
  CardsContainer,
  ScoreBoard,
  GameInfo,
  Message,
} from "../components/Board";
import ScoreDisplay from "../components/ScoreDisplay";
import PlayerCard from "../components/PlayerCard";
import GameOverScreen from "./GameOverScreen";
import { Starship, CategoryKey } from "../types/starship";
import type { GameMessage } from "../constants/messages";

interface GameViewProps {
  userCard: Starship | null;
  computerCard: Starship | null;
  userScore: number;
  computerScore: number;
  message: GameMessage | null;
  selectedCategory: CategoryKey | null;
  gameOver: boolean;
  onCategoryClick: (category: CategoryKey) => void;
  onReset: () => void;
}

export default function GameView({
  userCard,
  computerCard,
  userScore,
  computerScore,
  message,
  selectedCategory,
  gameOver,
  onCategoryClick,
  onReset,
}: GameViewProps) {
  return (
    <>
      {!gameOver && (
        <ScoreBoard role="region" aria-label="Current game scores">
          <ScoreDisplay label="You" value={userScore} />
          <ScoreDisplay label="PC" value={computerScore} />
        </ScoreBoard>
      )}
      
      <GameInfo>
        {gameOver ? (
          <GameOverScreen
            message={message?.text || ""}
            userScore={userScore}
            computerScore={computerScore}
            onReset={onReset}
          />
        ) : (
          <Message
            $type={message?.type || ""}
            role="status"
            aria-live="polite"
          >
            {message?.text || ""}
          </Message>
        )}
      </GameInfo>
      
      {!gameOver && (
        <CardsContainer>
          <PlayerCard
            starship={userCard}
            score={userScore}
            label="You"
            isPlayer={true}
            selectedCategory={selectedCategory}
            onCategoryClick={!selectedCategory ? onCategoryClick : undefined}
          />
          <PlayerCard
            starship={computerCard}
            score={computerScore}
            label="PC"
            isPlayer={false}
            selectedCategory={selectedCategory}
            hideValues={!selectedCategory}
          />
        </CardsContainer>
      )}
    </>
  );
}
