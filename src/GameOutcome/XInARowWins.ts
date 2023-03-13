import { Board } from "../Board";
import { Cell } from "../Cell";
import { Piece } from "../Piece";
import { Position } from "../Position";
import { GameOutcomeResolver } from "./GameOutcomeResolver";
import { GameOutcome, GameResult } from "./GameResult";

export class XInARowWins implements GameOutcomeResolver {
  constructor(private count: number) {}

  getResult(
    board: Board,
    lastPlayedPiece: Piece,
    lastPlayedPosition: Position
  ): GameResult {
    const { row, col } = lastPlayedPosition;
    const lastUpdatedRow = board.getRow(row);
    const lastUpdatedCol = board.getColumn(col);
    const lastUpdatedDiagonals = board.getDiagonals({ row, col });

    if (
      this.hasXInARow(lastUpdatedCol, lastPlayedPiece) ||
      this.hasXInARow(lastUpdatedRow, lastPlayedPiece) ||
      lastUpdatedDiagonals.some((diagonal) =>
        this.hasXInARow(diagonal, lastPlayedPiece)
      )
    ) {
      return { outcome: GameOutcome.END, winner: lastPlayedPiece };
    }

    if (board.getUnoccupiedPositions().length === 0) {
      return { outcome: GameOutcome.DRAW };
    }

    return { outcome: GameOutcome.NONE };
  }

  private hasXInARow(list: Cell[], piece: Piece) {
    if (list.length < this.count) {
      return false;
    }

    let inARowCount = 0;
    let counter = 0;
    while (counter < list.length) {
      const currentPiece = list[counter].getPiece();

      if (!currentPiece || currentPiece !== piece) {
        inARowCount = 0;
        counter++;
        continue;
      }

      if (currentPiece === piece) {
        inARowCount++;
        counter++;
        if (inARowCount === this.count) {
          return true;
        }
      }
    }
    return false;
  }
}
