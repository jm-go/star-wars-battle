import { Message, ResetButton, DecorativeIcon } from "../components/Board";
import spaceshipIcon from "../assets/spaceship_icon.png";

interface GameStartScreenProps {
  onStart: () => void;
}

export default function GameStartScreen({ onStart }: GameStartScreenProps) {
  return (
    <>
      <DecorativeIcon src={spaceshipIcon} alt="Decorative spaceship icon" />
      <Message as="h1" role="status" aria-live="polite">
        Welcome to Starship Battle!
      </Message>
      <Message
        $type="info"
        style={{ marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem" }}
      >
        Select an attribute to challenge the enemy ship. Highest value wins the
        round.
      </Message>
      <Message
        $type="info"
        style={{ marginTop: "0.5rem", fontStyle: "italic" }}
      >
        May the Force be with you.
      </Message>
      <ResetButton onClick={onStart} aria-label="Start the game">
        Start Game
      </ResetButton>
    </>
  );
}
