import { GameOutcomeResolver } from "../src/GameOutcome/GameOutcomeResolver";
import { GameOutcome, GameResult } from "../src/GameOutcome/GameResult";
import { XInARowWins } from "../src/GameOutcome/XInARowWins";
import { Piece } from "../src/Piece";
import { Player } from "../src/Player";
import { TicTacToeGame } from "../src/TicTacToeGame";

describe("A classic TicTacToe game flow", () => {
  let gameOutcomeResolver: GameOutcomeResolver;
  let player1: Player;
  let player2: Player;
  let game: TicTacToeGame;

  beforeEach(() => {
    gameOutcomeResolver = new XInARowWins(3);
    player1 = new Player(Piece.O);
    player2 = new Player(Piece.X);
    game = TicTacToeGame.create(3, 3, gameOutcomeResolver);
    game.addPlayer(player1);
    game.addPlayer(player2);
    game.startGame();
  });
  it("Should end with O wins (Diagonal case)", () => {
    let gameResult: GameResult;

    gameResult = game.play({ row: 0, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    gameResult = game.play({ row: 1, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    gameResult = game.play({ row: 1, col: 1 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    gameResult = game.play({ row: 1, col: 2 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     * O
     * X O X
     *     O
     */
    gameResult = game.play({ row: 2, col: 2 });
    expect(gameResult.outcome).toBe(GameOutcome.END);
    expect(gameResult.winner).toBe(Piece.O);
  });

  it("Should end with O wins (Same row case)", () => {
    let gameResult: GameResult;

    gameResult = game.play({ row: 0, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    gameResult = game.play({ row: 1, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    gameResult = game.play({ row: 0, col: 1 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    gameResult = game.play({ row: 1, col: 2 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     * O O O
     * X   X
     *
     */
    gameResult = game.play({ row: 0, col: 2 });
    expect(gameResult.outcome).toBe(GameOutcome.END);
    expect(gameResult.winner).toBe(Piece.O);
  });

  it("Should end with O wins (Same column case)", () => {
    let gameResult: GameResult;

    gameResult = game.play({ row: 0, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    gameResult = game.play({ row: 1, col: 1 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    gameResult = game.play({ row: 1, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    gameResult = game.play({ row: 1, col: 2 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     * O
     * O X X
     * O
     */
    gameResult = game.play({ row: 2, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.END);
    expect(gameResult.winner).toBe(Piece.O);
  });

  it("Should end with a draw", () => {
    let gameResult: GameResult;

    /**
     *  . O .
     *  . . .
     *  . . .
     */
    gameResult = game.play({ row: 0, col: 1 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     *  X O .
     *  . . .
     *  . . .
     */
    gameResult = game.play({ row: 0, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     *  X O .
     *  O . .
     *  . . .
     */
    gameResult = game.play({ row: 1, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     *  X O .
     *  O X .
     *  . . .
     */
    gameResult = game.play({ row: 1, col: 1 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     *  X O .
     *  O X .
     *  O . .
     */
    gameResult = game.play({ row: 2, col: 0 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     *  X O X
     *  O X .
     *  O . .
     */
    gameResult = game.play({ row: 0, col: 2 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     *  X O X
     *  O X O
     *  O . .
     */
    gameResult = game.play({ row: 1, col: 2 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     *  X O X
     *  O X O
     *  O X .
     */
    gameResult = game.play({ row: 2, col: 1 });
    expect(gameResult.outcome).toBe(GameOutcome.NONE);

    /**
     *  X O X
     *  X O O
     *  O X O
     */
    gameResult = game.play({ row: 2, col: 2 });
    expect(gameResult.outcome).toBe(GameOutcome.DRAW);
  });
});
