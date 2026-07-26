import { Score, ScoreLabel, ScoreValue } from "./Board";

interface ScoreDisplayProps {
  label: string;
  value: number;
}

export default function ScoreDisplay({ label, value }: ScoreDisplayProps) {
  return (
    <Score aria-label={`${label} score: ${value}`}>
      <ScoreLabel>{label}</ScoreLabel>
      <ScoreValue aria-live="polite">{value}</ScoreValue>
    </Score>
  );
}
