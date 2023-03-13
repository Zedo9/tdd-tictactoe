import { Board } from "../src/Board";
import { GameOutcome } from "../src/GameOutcome/GameResult";
import { XInARowWins } from "../src/GameOutcome/XInARowWins";
import { Piece } from "../src/Piece";

describe("X in a row wins", () => {
  it("Outcome should be win when a player have 3 pieces on the same row", () => {
    const gameOutcomeResolver = new XInARowWins(3);
    const board = new Board(3, 3);
    board.fillCell(Piece.X, { row: 0, col: 0 });
    board.fillCell(Piece.X, { row: 0, col: 1 });
    board.fillCell(Piece.X, { row: 0, col: 2 });

    const { outcome, winner } = gameOutcomeResolver.getResult(board, Piece.X, {
      row: 0,
      col: 2,
    });
    expect(outcome).toBe(GameOutcome.END);
    expect(winner).toBe(Piece.X);
  });

  it("Outcome should be win when a player have 3 pieces on the same col", () => {
    const gameOutcomeResolver = new XInARowWins(3);
    const board = new Board(3, 3);
    board.fillCell(Piece.X, { row: 0, col: 0 });
    board.fillCell(Piece.X, { row: 1, col: 0 });
    board.fillCell(Piece.X, { row: 2, col: 0 });

    const { outcome, winner } = gameOutcomeResolver.getResult(board, Piece.X, {
      row: 2,
      col: 0,
    });
    expect(outcome).toBe(GameOutcome.END);
    expect(winner).toBe(Piece.X);
  });

  it("Outcome should be win when a player have 3 pieces on a diagonal", () => {
    const gameOutcomeResolver = new XInARowWins(3);
    const board = new Board(3, 3);
    board.fillCell(Piece.X, { row: 0, col: 0 });
    board.fillCell(Piece.X, { row: 1, col: 1 });
    board.fillCell(Piece.X, { row: 2, col: 2 });

    const { outcome, winner } = gameOutcomeResolver.getResult(board, Piece.X, {
      row: 2,
      col: 2,
    });
    expect(outcome).toBe(GameOutcome.END);
    expect(winner).toBe(Piece.X);
  });

  it("Outcome should be Draw when all cells were filled and there is no winner", () => {
    const gameOutcomeResolver = new XInARowWins(3);
    const board = new Board(3, 3);

    /**
     * X O X
     * O X O
     * O X O
     */
    board.fillCell(Piece.X, { row: 0, col: 0 });
    board.fillCell(Piece.O, { row: 0, col: 1 });
    board.fillCell(Piece.X, { row: 0, col: 2 });
    board.fillCell(Piece.O, { row: 1, col: 0 });
    board.fillCell(Piece.X, { row: 1, col: 1 });
    board.fillCell(Piece.O, { row: 1, col: 2 });
    board.fillCell(Piece.O, { row: 2, col: 0 });
    board.fillCell(Piece.X, { row: 2, col: 1 });
    board.fillCell(Piece.O, { row: 2, col: 2 });

    const { outcome, winner } = gameOutcomeResolver.getResult(board, Piece.O, {
      row: 2,
      col: 2,
    });
    expect(outcome).toBe(GameOutcome.DRAW);
    expect(winner).toBeUndefined();
  });

  it("Outcome should be None when the game is still in progress and there is no winner", () => {
    const gameOutcomeResolver = new XInARowWins(3);
    const board = new Board(3, 3);

    /**
     * X O X
     * O X O
     * O X O
     */
    board.fillCell(Piece.X, { row: 0, col: 0 });
    board.fillCell(Piece.O, { row: 0, col: 1 });

    const { outcome, winner } = gameOutcomeResolver.getResult(board, Piece.O, {
      row: 0,
      col: 1,
    });
    expect(outcome).toBe(GameOutcome.NONE);
    expect(winner).toBeUndefined();
  });
});
