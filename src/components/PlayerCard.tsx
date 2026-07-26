import {
  CardWithScore,
  MobileScore,
  MobileScoreLabel,
  MobileScoreValue,
} from "./Board";
import Card from "./Card";
import { Starship, CategoryKey } from "../types/starship";

interface PlayerCardProps {
  starship: Starship | null;
  isPlayer: boolean;
  selectedCategory: CategoryKey | null;
  onCategoryClick?: (category: CategoryKey) => void;
  hideValues?: boolean;
  score: number;
  label: string;
}

export default function PlayerCard({
  starship,
  isPlayer,
  selectedCategory,
  onCategoryClick,
  hideValues = false,
  score,
  label,
}: PlayerCardProps) {
  return (
    <CardWithScore>
      <MobileScore>
        <MobileScoreLabel>{label}</MobileScoreLabel>
        <MobileScoreValue>{score}</MobileScoreValue>
      </MobileScore>
      <Card
        starship={starship}
        isPlayer={isPlayer}
        selectedCategory={selectedCategory}
        onCategoryClick={onCategoryClick}
        hideValues={hideValues}
      />
    </CardWithScore>
  );
}
