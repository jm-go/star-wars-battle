import Board, { GameContainer, GameInfo, Message } from "./components/Board";
import GameStartScreen from "./screens/GameStartScreen";
import LoadingSpinner from "./components/LoadingSpinner";
import GameView from "./screens/GameView";
import { useStarWarsGame } from "./hooks/useStarWarsGame";

function App() {
  const {
    userCard,
    computerCard,
    userScore,
    computerScore,
    message,
    selectedCategory,
    isLoading,
    gameStarted,
    gameOver,
    error,
    handleCategoryClick,
    handleStart,
    handleReset,
  } = useStarWarsGame();

  if (error) {
    return (
      <Board>
        <GameContainer>
          <GameInfo>
            <Message role="alert" aria-live="assertive">
              {error}
            </Message>
          </GameInfo>
        </GameContainer>
      </Board>
    );
  }

  if (isLoading) {
    return (
      <Board>
        <GameContainer>
          <LoadingSpinner />
        </GameContainer>
      </Board>
    );
  }

  return (
    <Board>
      <GameContainer>
        {!gameStarted ? (
          <GameInfo>
            <GameStartScreen onStart={handleStart} />
          </GameInfo>
        ) : (
          <GameView
            userCard={userCard}
            computerCard={computerCard}
            userScore={userScore}
            computerScore={computerScore}
            message={message}
            selectedCategory={selectedCategory}
            gameOver={gameOver}
            onCategoryClick={handleCategoryClick}
            onReset={handleReset}
          />
        )}
      </GameContainer>
    </Board>
  );
}

export default App;
