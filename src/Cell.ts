import { Piece } from "./Piece";
import { Position } from "./Position";

export class Cell {
  private piece?: Piece;
  readonly position: Position;

  constructor(row: number, col: number) {
    this.position = { row, col };
  }

  setPiece(piece: Piece) {
    if (this.isOccupied()) {
      throw new Error("You can't override an already set cell.");
    }
    this.piece = piece;
  }

  isOccupied() {
    return this.piece !== undefined;
  }

  getPiece(): Piece | undefined {
    return this.piece;
  }
}
