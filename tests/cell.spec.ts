import { Cell } from "../src/Cell";
import { Piece } from "../src/Piece";

describe("A TicTocToe cell", () => {
  it("Should have an unchangeable position", () => {
    const cell = new Cell(0, 0);
    const { row, col } = cell.position;

    expect(row).toBe(0);
    expect(col).toBe(0);
  });

  it("Should be initialized empty", () => {
    const cell = new Cell(0, 0);

    const isOccupied = cell.isOccupied();

    expect(isOccupied).toBe(false);
  });

  it("Should become occupied after a piece was set", () => {
    const cell = new Cell(0, 0);
    cell.setPiece(Piece.O);

    const isOccupied = cell.isOccupied();

    expect(isOccupied).toBe(true);
  });

  it("Can't be overridden", () => {
    const cell = new Cell(0, 0);
    cell.setPiece(Piece.O);

    expect(() => cell.setPiece(Piece.X)).toThrowError(
      new Error("You can't override an already set cell.")
    );
  });
});
