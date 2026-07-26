import {
  Message,
  FinalResults,
  FinalScore,
  FinalScoreLabel,
  FinalScoreValue,
  ResetButton,
} from "../components/Board";

interface GameOverScreenProps {
  message: string;
  userScore: number;
  computerScore: number;
  onReset: () => void;
}

export default function GameOverScreen({
  message,
  userScore,
  computerScore,
  onReset,
}: GameOverScreenProps) {
  const winner = userScore > computerScore ? "You won!" : userScore < computerScore ? "Enemy won!" : "It's a draw!";
  
  return (
    <>
      <Message as="h1" role="status" aria-live="assertive">
        {message}
      </Message>

      <FinalResults role="region" aria-label="Final scores">
        <FinalScore>
          <FinalScoreLabel>You</FinalScoreLabel>
          <FinalScoreValue aria-label={`Your score: ${userScore}`}>{userScore}</FinalScoreValue>
        </FinalScore>
        <FinalScore>
          <FinalScoreLabel>PC</FinalScoreLabel>
          <FinalScoreValue aria-label={`Enemy score: ${computerScore}`}>{computerScore}</FinalScoreValue>
        </FinalScore>
      </FinalResults>

      <Message $type="info" aria-live="polite" style={{ marginTop: "1rem", fontSize: "1.25rem" }}>
        {winner}
      </Message>

      <ResetButton onClick={onReset} aria-label="Start a new game">
        Play Again
      </ResetButton>
    </>
  );
}
