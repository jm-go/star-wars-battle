export type MessageType = "win" | "lose" | "draw" | "info" | "";

export interface GameMessage {
  text: string;
  type: MessageType;
}

export type MessageKey = "WIN" | "LOSE" | "DRAW" | "GAME_OVER" | "GET_READY";

export const GAME_MESSAGES: Record<MessageKey, GameMessage> = {
  WIN: {
    text: "You win!",
    type: "win",
  },
  LOSE: {
    text: "You lose!",
    type: "lose",
  },
  DRAW: {
    text: "Draw!",
    type: "draw",
  },
  GAME_OVER: {
    text: "No more starships available",
    type: "info",
  },
  GET_READY: {
    text: "Get ready...",
    type: "",
  },
};
