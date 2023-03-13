import { Board } from "../Board";
import { Piece } from "../Piece";
import { Position } from "../Position";
import { GameResult } from "./GameResult";

export interface GameOutcomeResolver {
  getResult(
    board: Board,
    lastPlayedPiece: Piece,
    lastPlayedPosition: Position
  ): GameResult;
}
