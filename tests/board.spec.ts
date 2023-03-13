import { Board } from "../src/Board";
import { Piece } from "../src/Piece";

describe("A TicTocToe board", () => {
  it("All cells should be unoccupied on initialization", () => {
    const board = new Board(3, 3);
    const unoccupiedCells = board.getUnoccupiedPositions();

    expect(unoccupiedCells).toHaveLength(9);
  });
  describe("fillCell", () => {
    it("Should fill a board cell given its position", () => {
      const board = new Board(3, 5);

      board.fillCell(Piece.O, { row: 0, col: 0 });
    });

    it("Should throw an error if the cell was already filled", () => {
      const board = new Board(3, 5);

      board.fillCell(Piece.O, { row: 0, col: 0 });
      expect(() => board.fillCell(Piece.O, { row: 0, col: 0 })).toThrowError();
    });

    it("Should throw an error if position is out of board boundaries", () => {
      const board = new Board(3, 5);

      expect(() => board.fillCell(Piece.O, { row: 6, col: 6 })).toThrowError();
    });
  });

  describe("getRowsCount", () => {
    it("Should return the count of rows in the board", () => {
      const board = new Board(3, 5);

      const rowsCount = board.getRowsCount();

      expect(rowsCount).toBe(3);
    });
  });

  describe("getColsCount", () => {
    it("Should return the count of columns in the board", () => {
      const board = new Board(3, 5);

      const colsCount = board.getColsCount();

      expect(colsCount).toBe(5);
    });
  });

  describe("getRow", () => {
    it("Should return the cells of a given row", () => {
      const board = new Board(3, 5);

      const row = board.getRow(0);

      expect(row).toHaveLength(5);
    });

    it("Should throw an error if the index is out of board boundaries", () => {
      const board = new Board(3, 5);

      expect(() => board.getRow(6)).toThrowError();
    });
  });

  describe("getColumn", () => {
    it("Should return the cells of a given column", () => {
      const board = new Board(3, 5);

      const column = board.getColumn(0);

      expect(column).toHaveLength(3);
    });

    it("Should throw an error if the index is out of board boundaries", () => {
      const board = new Board(3, 5);

      expect(() => board.getColumn(6)).toThrowError();
    });
  });

  describe("getDiagonals", () => {
    it("Should return all diagonals passing by a given position", () => {
      const board = new Board(5, 5);
      const position = { row: 1, col: 1 };
      const diagonals = board.getDiagonals(position);

      expect(diagonals).toHaveLength(2);
    });

    it("Should throw an error if the index is out of board boundaries", () => {
      const board = new Board(3, 5);

      expect(() => board.getDiagonals({ row: 6, col: 6 })).toThrowError();
    });
  });
});
