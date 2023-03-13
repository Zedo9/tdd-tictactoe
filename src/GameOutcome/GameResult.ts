import { Piece } from "../Piece";

export enum GameOutcome {
  END,
  DRAW,
  NONE, // Indicates that the game still has no outcome (In progress)
}

export interface GameResult {
  outcome: GameOutcome;
  winner?: Piece;
}
