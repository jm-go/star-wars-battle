export interface Starship {
  name: string;
  starship_class: string;
  max_atmosphering_speed: string;
  cost_in_credits: string;
  passengers: string;
  films: string[];
}

export type CategoryKey =
  | "max_atmosphering_speed"
  | "cost_in_credits"
  | "passengers"
  | "films";

export interface GameState {
  userCard: Starship | null;
  computerCard: Starship | null;
  userScore: number;
  computerScore: number;
  message: string;
  selectedCategory: CategoryKey | null;
  isLoading: boolean;
}
